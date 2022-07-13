import "./studyAdd.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { url } from "../../../../config";
import { StudyPost, StudyContent } from "../../../../types/study";

export default function ProjectAdd() {
  const { title } = useParams();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studyPost, setStudyPost] = useState<StudyPost>({
    title: "",
    contents: [],
  });
  const [studyContentsArray, setStudyContentsArray] = useState<
    Array<StudyContent>
  >([]);

  useEffect(() => {
    const fetchStudyPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(url + "API/studyPost/" + title);
        setStudyPost(res.data);
        setStudyContentsArray(res.data.blogContents);
        setAmount(res.data.blogContents.length);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStudyPost();
  }, []);

  const onContentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setStudyContentsArray([
      ...studyContentsArray.slice(0, i),
      { ...studyContentsArray[i], content: e.target.value },
      ...studyContentsArray.slice(i + 1),
    ]);
  };
  const onContentImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setStudyContentsArray([
      ...studyContentsArray.slice(0, i),
      { ...studyContentsArray[i], image: e.target.value },
      ...studyContentsArray.slice(i + 1),
    ]);
  };
  const onContentCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setStudyContentsArray([
      ...studyContentsArray.slice(0, i),
      { ...studyContentsArray[i], code: e.target.value },
      ...studyContentsArray.slice(i + 1),
    ]);
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setStudyContentsArray([
      ...studyContentsArray,
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
      .post(url + "edit/studyPost", studyPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        alert("Post Has been Created Successfully !");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to Create a Post !");
      });
  };

  const capturePost = () => {
    setStudyPost({
      ...studyPost,
      contents: studyContentsArray,
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
                  <input type="text" value={studyPost.title} disabled />
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
                          value={studyContentsArray[i].image}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentContentChange(e, i)}
                          value={studyContentsArray[i].content}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentCodeChange(e, i)}
                          value={studyContentsArray[i].code}
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
