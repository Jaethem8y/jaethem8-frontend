import "./studyEdit.scss";

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
        console.log("here", res.data);
        setStudyPost(res.data);
        setStudyContentsArray(res.data.studyContents);
        setAmount(res.data.studyContents.length);
        setLoading(false);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    };
    fetchStudyPost();
  }, []);

  const onContentChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    i: number,
    t: string
  ) => {
    setStudyContentsArray([
      ...studyContentsArray.slice(0, i),
      { ...studyContentsArray[i], [t]: e.target.value },
      ...studyContentsArray.slice(i + 1),
    ]);
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setStudyContentsArray([
      ...studyContentsArray,
      {
        location: amount,
        header: "",
        content: "",
        link: "",
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

  const deletePost = () => {
    axios
      .post(url + "delete/studyPost", studyPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("apiKey"),
        },
      })
      .then((res) => {
        alert("Post Has been Deleted Successfully !");
      })
      .catch((err) => {
        alert("Failed to Delete a Post !");
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
        <h3>Edit a Study Post</h3>
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
                      <td>Header : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentChange(e, i, "header")}
                          value={studyContentsArray[i].header}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Image : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentChange(e, i, "image")}
                          value={studyContentsArray[i].image}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Link : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentChange(e, i, "link")}
                          value={studyContentsArray[i].link}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content : </td>
                      <td>
                        <textarea
                          onChange={(e) => onContentChange(e, i, "content")}
                          value={studyContentsArray[i].content}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <textarea
                          onChange={(e) => onContentChange(e, i, "code")}
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
        <br />
        <button onClick={() => deletePost()}>Delete Post</button>
      </div>
    </div>
  );
}
