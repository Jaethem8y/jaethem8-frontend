import "./projectAdd.scss";

import React, { useState, useRef } from "react";

type BlogContent = {
  location: number;
  content: string;
  image: string;
  code: string;
};

type BlogPost = {
  title: string;
  role: string;
  frontend: string;
  backend: string;
  general: string;
  contents: Array<BlogContent>;
};

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

  const onContentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
    e: React.ChangeEvent<HTMLInputElement>,
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
        content: "",
        image: "",
        code: "",
      },
    ]);
  };

  const capturePost = () => {
    setBlogPost({
      ...blogPost,
      contents: blogContentsArray,
    });
    console.log(blogPost);
  };

  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Project Post</h3>
        <div className="add-porject-post">
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
                        <input
                          type="text"
                          onChange={(e) => onContentContentChange(e, i)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Code : </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentCodeChange(e, i)}
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
        <button onClick={() => capturePost()}>CapturePost</button>
      </div>
    </div>
  );
}
