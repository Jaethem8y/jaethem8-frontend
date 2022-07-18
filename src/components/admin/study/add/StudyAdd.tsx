import "./studyAdd.scss";

import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../../config";
import { StudyPost, StudyContent } from "../../../../types/study";

export default function ProjectAdd() {
  const [amount, setAmount] = useState(0);
  const [studyPost, setStudyPost] = useState<StudyPost>({
    title: "",
    contents: [],
  });
  const [studyContentsArray, setStudyContentsArray] = useState<
    Array<StudyContent>
  >([]);

  const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyPost({
      ...studyPost,
      title: e.target.value,
    });
  };

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

  const addPost = () => {
    axios
      .post(url + "add/studyPost", studyPost, {
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
    console.log(studyPost);
  };

  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Study Post</h3>
        <div className="add-project-post">
          <table>
            <tbody>
              <tr>
                <td>title : </td>
                <td>
                  <input type="text" onChange={(e) => onPostTitleChange(e)} />
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
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Image : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentChange(e, i, "image")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Link : </td>
                      <td>
                        <input
                          onChange={(e) => onContentChange(e, i, "link")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content : </td>
                      <td>
                        <textarea
                          onChange={(e) => onContentChange(e, i, "content")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <textarea
                          onChange={(e) => onContentChange(e, i, "code")}
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
        <button onClick={() => addPost()}>Send Post</button>
      </div>
    </div>
  );
}
