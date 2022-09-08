import "./projectAdd.scss";

import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../../config";
import { BlogPost, Content as BlogContent } from "../../../../types/post";
import { CHANGE_EVENT } from "../../../../types/HTMLEvent";

export default function ProjectAdd() {
  const [amount, setAmount] = useState(1);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    role: "",
    frontend: "",
    backend: "",
    general: "",
    description: "",
    contents: [],
  });
  const [blogContents, setBlogContents] = useState<BlogContent[]>([
    {
      location: 0,
      header: "",
      content: "",
      images: [
        {
          image: "",
        },
      ],
      links: [
        {
          tag: "",
          link: "",
        },
      ],
    },
  ]);

  const addContent = () => {
    console.log(localStorage.getItem("apiKey"));
    setAmount((amount) => (amount += 1));
    setBlogContents((blogContents) => [
      ...blogContents,
      {
        location: amount,
        header: "",
        content: "",
        images: [
          {
            image: "",
          },
        ],
        links: [
          {
            tag: "",
            link: "",
          },
        ],
      },
    ]);
    setBlogPost((blogPost) => ({
      ...blogPost,
      contents: blogContents,
    }));
  };

  const addLink = (i: number) => {
    setBlogContents((blogContents) => [
      ...blogContents.slice(0, i),
      {
        ...blogContents[i],
        links: [
          ...blogContents[i].links,
          {
            tag: "",
            link: "",
          },
        ],
      },
      ...blogContents.slice(i + 1),
    ]);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
    console.log(blogPost);
    console.log(blogContents);
  };

  const addImage = (i: number) => {
    setBlogContents((blogContents) => [
      ...blogContents.slice(0, i),
      {
        ...blogContents[i],
        images: [
          ...blogContents[i].images,
          {
            image: "",
          },
        ],
      },
      ...blogContents.slice(i + 1),
    ]);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
    console.log(blogPost);
    console.log(blogContents);
  };

  const onPostChange = (e: CHANGE_EVENT, t: string) => {
    setBlogPost({
      ...blogPost,
      [t]: e.target.value,
    });
  };

  const onContentChange = (e: CHANGE_EVENT, i: number, t: string) => {
    setBlogContents((blogContents) => [
      ...blogContents.slice(0, i),
      {
        ...blogContents[i],
        [t]: e.target.value,
      },
      ...blogContents.slice(i + 1),
    ]);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
  };

  const onImageChange = (e: CHANGE_EVENT, i: number, l: number) => {
    setBlogContents((blogContents) => [
      ...blogContents.slice(0, i),
      {
        ...blogContents[i],
        images: [
          ...blogContents[i].images.slice(0, l),
          {
            image: e.target.value,
          },
          ...blogContents[i].images.slice(l + 1),
        ],
      },
      ...blogContents.slice(i + 1),
    ]);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
  };

  const onLinkChange = (e: CHANGE_EVENT, i: number, l: number, t: string) => {
    setBlogContents((blogContents) => [
      ...blogContents.slice(0, i),
      {
        ...blogContents[i],
        links: [
          ...blogContents[i].links.slice(0, l),
          {
            ...blogContents[i].links[l],
            [t]: e.target.value,
          },
          ...blogContents[i].links.slice(l + 1),
        ],
      },
      ...blogContents.slice(i + 1),
    ]);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
  };

  const addPost = () => {
    console.log(blogPost);
    setBlogPost((blogPost) => ({ ...blogPost, contents: blogContents }));
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
  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Project Post</h3>
        <div className="add-project-post">
          <table>
            <tbody>
              <tr>
                <td>title :</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostChange(e, "title")}
                  />
                </td>
              </tr>
              <tr>
                <td>role :</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostChange(e, "role")}
                  />
                </td>
              </tr>
              <tr>
                <td>frontend :</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostChange(e, "frontend")}
                  />
                </td>
              </tr>
              <tr>
                <td>backend :</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostChange(e, "backend")}
                  />
                </td>
              </tr>
              <tr>
                <td>general :</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => onPostChange(e, "general")}
                  />
                </td>
              </tr>
              <tr>
                <td>description :</td>
                <td>
                  <textarea onChange={(e) => onPostChange(e, "description")} />
                </td>
              </tr>
            </tbody>
          </table>

          {blogContents.map((el, i) => {
            return (
              <div key={i} className="add-project-post">
                <table>
                  <tbody>
                    <tr>
                      <td>Header</td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => onContentChange(e, i, "header")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>content</td>
                      <td>
                        <textarea
                          onChange={(e) => onContentChange(e, i, "content")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {blogContents[i].links.map((el, l) => {
                  return (
                    <div
                      key={i.toString() + l.toString()}
                      className="add-project-object"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>tag</td>
                            <td>
                              <input
                                type="text"
                                onChange={(e) => onLinkChange(e, i, l, "tag")}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>links</td>
                            <td>
                              <input
                                type="text"
                                onChange={(e) => onLinkChange(e, i, l, "link")}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
                <button onClick={() => addLink(i)}>Add More Links</button>

                {blogContents[i].images.map((el, l) => {
                  return (
                    <div
                      key={l.toString() + i.toString()}
                      className="add-project-object"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>image</td>
                            <td>
                              <input
                                type="text"
                                onChange={(e) => onImageChange(e, i, l)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
                <button onClick={() => addImage(i)}>Add More Image</button>
              </div>
            );
          })}
          <button onClick={() => addContent()}>Add More Content</button>
        </div>
        <br />
        <button onClick={() => addPost()}>Send Post</button>
      </div>
    </div>
  );
}
