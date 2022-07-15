import "./projectAdd.scss";

import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../../config";
import { BlogPost, BlogContent } from "../../../../types/blog";

export default function ProjectAdd() {
  const [amount, setAmount] = useState(0);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    role: "",
    frontend: "",
    backend: "",
    general: "",
    contents: [],
  });
  const [blogContentsArray, setBlogContentsArray] = useState<
    Array<BlogContent>
  >([]);

  const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      title: e.target.value,
    });
  };
  const onPostRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      role: e.target.value,
    });
  };
  const onPostFrontendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      frontend: e.target.value,
    });
  };
  const onPostBackendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      backend: e.target.value,
    });
  };
  const onPostGeneralChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      general: e.target.value,
    });
  };

  const onContentHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setBlogContentsArray([
      ...blogContentsArray.slice(0, i),
      { ...blogContentsArray[i], header: e.target.value },
      ...blogContentsArray.slice(i + 1),
    ]);
  };
  const onContentContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) => {
    setBlogContentsArray([
      ...blogContentsArray.slice(0, i),
      { ...blogContentsArray[i], content: e.target.value },
      ...blogContentsArray.slice(i + 1),
    ]);
  };
  const onContentImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setBlogContentsArray([
      ...blogContentsArray.slice(0, i),
      { ...blogContentsArray[i], image: e.target.value },
      ...blogContentsArray.slice(i + 1),
    ]);
  };
  const onContentCodeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) => {
    setBlogContentsArray([
      ...blogContentsArray.slice(0, i),
      { ...blogContentsArray[i], code: e.target.value },
      ...blogContentsArray.slice(i + 1),
    ]);
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setBlogContentsArray([
      ...blogContentsArray,
      {
        location: amount,
        header: "",
        content: "",
        image: "",
        code: "",
      },
    ]);
  };

  const addPost = () => {
    axios
      .post(url + "add/blogPost", blogPost, {
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
    setBlogPost({
      ...blogPost,
      contents: blogContentsArray,
    });
  };

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
                  <input type="text" onChange={(e) => onPostTitleChange(e)} />
                </td>
              </tr>
              <tr>
                <td>role : </td>
                <td>
                  <input type="text" onChange={(e) => onPostRoleChange(e)} />
                </td>
              </tr>
              <tr>
                <td>frontend : </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostFrontendChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>backend : </td>
                <td>
                  <input type="text" onChange={(e) => onPostBackendChange(e)} />
                </td>
              </tr>
              <tr>
                <td>general : </td>
                <td>
                  <input type="text" onChange={(e) => onPostGeneralChagne(e)} />
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
                      <td>Header: </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentHeaderChange(e, i)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Image : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentImageChange(e, i)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content : </td>
                      <td>
                        <textarea
                          onChange={(e) => onContentContentChange(e, i)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <textarea onChange={(e) => onContentCodeChange(e, i)} />
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
