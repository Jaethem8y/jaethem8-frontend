import "./personalAdd.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { url } from "../../../../config";
import { PersonalPost, PersonalContent } from "../../../../types/personal";

export default function ProjectAdd() {
  const { title } = useParams();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personalPost, setPersonalPost] = useState<PersonalPost>({
    title: "",
    contents: [],
  });
  const [personalContentsArray, setPersonalContentsArray] = useState<
    Array<PersonalContent>
  >([]);

  useEffect(() => {
    const fetchPersonalPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url + "API/studyPost/" + title);
        setPersonalPost(res.data);
        setPersonalContentsArray(res.data.blogContents);
        setAmount(res.data.blogContents.length);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPersonalPost();
  }, []);

  const onContentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setPersonalContentsArray([
      ...personalContentsArray.slice(0, i),
      { ...personalContentsArray[i], content: e.target.value },
      ...personalContentsArray.slice(i + 1),
    ]);
  };
  const onContentImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setPersonalContentsArray([
      ...personalContentsArray.slice(0, i),
      { ...personalContentsArray[i], image: e.target.value },
      ...personalContentsArray.slice(i + 1),
    ]);
  };
  const onContentCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setPersonalContentsArray([
      ...personalContentsArray.slice(0, i),
      { ...personalContentsArray[i], code: e.target.value },
      ...personalContentsArray.slice(i + 1),
    ]);
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setPersonalContentsArray([
      ...personalContentsArray,
      {
        location: amount,
        content: "",
        image: "",
        code: "",
      },
    ]);
  };

  const editPost = () => {
    axios
      .post(url + "edit/personalPost", personalPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        alert("Post Has been Created Successfully !");
      })
      .catch((err) => {
        alert("Failed to Create a Post !");
      });
  };

  const capturePost = () => {
    setPersonalPost({
      ...personalPost,
      contents: personalContentsArray,
    });
  };

  if (loading) {
    return <h3>Loading ...</h3>;
  }
  if (error) {
    return <h3>There has been an error</h3>;
  }

  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Project Post</h3>
        <div className="add-project-post">
          <table>
            <tbody>
              <tr>
                <td>title : </td>
                <td>
                  <input type="text" value={personalPost.title} disabled />
                </td>
              </tr>
            </tbody>
          </table>
          {Array.from(Array(amount), (el, i) => {
            return (
              <div className="add-project-objecs" key={i}>
                <hr />
                <h5>Add More Content</h5>
                <table>
                  <tbody>
                    <tr>
                      <td>Image : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentImageChange(e, i)}
                          value={personalContentsArray[i].image}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentContentChange(e, i)}
                          value={personalContentsArray[i].content}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentCodeChange(e, i)}
                          value={personalContentsArray[i].code}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
          <button onClick={() => addMoreContent()}>Add More Content</button>
        </div>
        <button onClick={() => capturePost()}>CapturePost Click Twice</button>
        <br />
        <button onClick={() => editPost()}>Send Post</button>
      </div>
    </div>
  );
}