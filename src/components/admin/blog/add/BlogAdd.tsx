import React, { useState } from "react";
import { BlogPost } from "../../../../types/DTO";
import axios from "axios";
import { url } from "../../../../config";
import { CHANGE_EVENT } from "../../../../types/HTMLEvent";

export default function BlogAdd() {
  const [amount, setAmount] = useState(0);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    role: "",
    frontend: "",
    backend: "",
    description: "",
    general: "",
    contents: [],
  });

  const onPostChange = (e: CHANGE_EVENT, t: string) => {
    setBlogPost({
      ...blogPost,
      [t]: e.target.value,
    });
  };

  const onContentChange = (e: CHANGE_EVENT, i: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        { ...blogPost.contents[i], [t]: e.target.value },
        ...blogPost.contents.slice(i + 1),
      ],
    });
  };

  const onLinkChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          links: [
            ...blogPost.contents[i].links.slice(0, j),
            { ...blogPost.contents[i].links[j], [t]: e.target.value },
            ...blogPost.contents[i].links.slice(j + 1),
          ],
        },
        ...blogPost.contents.slice(i + 1),
      ],
    });
  };

  const onImageChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          images: [
            ...blogPost.contents[i].images.slice(0, j),
            { ...blogPost.contents[i].images[j], [t]: e.target.value },
            ...blogPost.contents[i].images.slice(j + 1),
          ],
        },
        ...blogPost.contents.slice(i + 1),
      ],
    });
  };

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents,
        {
          location: amount,
          header: "",
          content: "",
          code: "",
          links: [],
          images: [],
        },
      ],
    });
    console.log(blogPost);
  };

  const addMoreLink = (i: number) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          links: [
            ...blogPost.contents[i].links,
            {
              tag: "",
              link: "",
            },
          ],
        },
        ...blogPost.contents.slice(i + 1),
      ],
    });
  };

  const addMoreImage = (i: number) => {
    setBlogPost({
      ...blogPost,
      contents: [
        ...blogPost.contents.slice(0, i),
        {
          ...blogPost.contents[i],
          images: [
            ...blogPost.contents[i].images,
            {
              image: "",
            },
          ],
        },
        ...blogPost.contents.slice(i + 1),
      ],
    });
  };

  const capturePost = () => {
    setBlogPost(blogPost);
    console.log(blogPost);
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

  return (
    <div className="admin-post-wrapper">
      <div className="admin-post-content">
        <table>
          <tbody>
            <tr>
              <td>title : </td>
              <td>
                <input type="text" onChange={(e) => onPostChange(e, "title")} />
              </td>
            </tr>
            <tr>
              <td>role : </td>
              <td>
                <input type="text" onChange={(e) => onPostChange(e, "role")} />
              </td>
            </tr>
            <tr>
              <td>frontend : </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => onPostChange(e, "frontend")}
                />
              </td>
            </tr>
            <tr>
              <td>backend : </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => onPostChange(e, "backend")}
                />
              </td>
            </tr>
            <tr>
              <td>description : </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => onPostChange(e, "description")}
                />
              </td>
            </tr>
            <tr>
              <td>general:</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => onPostChange(e, "general")}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {blogPost.contents.forEach((content, i) => {
          return (
            <div className="admin-post-content-content">
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
                  {content.links.forEach((link, j) => {
                    return (
                      <>
                        <tr>
                          <td>tag : </td>
                          <td>
                            <input
                              type="text"
                              onChange={(e) => onLinkChange(e, i, j, "tag")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>link : </td>
                          <td>
                            <input
                              type="text"
                              onChange={(e) => onLinkChange(e, i, j, "link")}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <button onClick={() => addMoreLink(i)}>Add More Links</button>

                  {content.images.forEach((image, j) => {
                    return (
                      <>
                        <tr>
                          <td>image : </td>
                          <td>
                            <input
                              type="text"
                              onChange={(e) => onImageChange(e, i, j, "image")}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <button onClick={() => addMoreImage(i)}>
                    Add More Images
                  </button>
                </tbody>
              </table>
            </div>
          );
        })}
        <button onClick={() => addMoreContent()}>Add more contents</button>
        <button onClick={() => addPost()}>Write Post!</button>
      </div>
    </div>
  );
}
