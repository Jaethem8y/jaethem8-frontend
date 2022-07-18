import "./personalAdd.scss";

import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../../config";
import { PersonalPost, PersonalContent } from "../../../../types/personal";

export default function ProjectAdd() {
  const [amount, setAmount] = useState(0);
  const [personalPost, setPersonalPost] = useState<PersonalPost>({
    title: "",
    contents: [],
  });
  const [personalContentsArray, setPersonalContentsArray] = useState<
    Array<PersonalContent>
  >([]);

  const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalPost({
      ...personalPost,
      title: e.target.value,
    });
  };

  const onContentChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    i: number,
    t: string
  ) => {
    setPersonalContentsArray([
      ...personalContentsArray.slice(0, i),
      { ...personalContentsArray[i], [t]: e.target.value },
      ...personalContentsArray.slice(i + 1),
    ]);
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setPersonalContentsArray([
      ...personalContentsArray,
      {
        location: amount,
        header: "",
        link: "",
        content: "",
        image: "",
        code: "",
      },
    ]);
  };

  const addPost = () => {
    axios
      .post(url + "add/personalPost", personalPost, {
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

  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Personal Post</h3>
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
                          type="text"
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
