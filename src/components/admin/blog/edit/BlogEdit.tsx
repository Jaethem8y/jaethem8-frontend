import "../../../../styles/admin/post.scss"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BlogPost} from "../../../../types/DTO";
import axios from "axios";
import {url} from "../../../../config";
import {CHANGE_EVENT} from "../../../../types/HTMLEvent";

export default function BlogAdd() {
  const {title} = useParams();
  const [amount, setAmount] = useState(0);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    role: "",
    frontend: "",
    backend: "",
    pubDate: "",
    description: "",
    general: "",
    contents: [],
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await axios.get(url + "API/blogPost/" + title);
        setBlogPost(res.data);
        setAmount(res.data.blogContents.length);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBlogPost();
  }, [])

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
        {...blogPost.contents[i], [t]: e.target.value},
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
            {...blogPost.contents[i].links[j], [t]: e.target.value},
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
            {...blogPost.contents[i].images[j], [t]: e.target.value},
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
    capturePost();
    axios
      .post(url + "edit/blogPost", blogPost, {
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
    <div className="post-wrapper">
      <div className="post-content">
        <h3>Add a Project Post</h3>
        <div className="add-project-post">
          <table>
            <tbody>
            <tr>
              <td>title :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.title}
                  onChange={(e) => onPostChange(e, "title")}
                />
              </td>
            </tr>
            <tr>
              <td>role :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.role}
                  onChange={(e) => onPostChange(e, "role")}
                />
              </td>
            </tr>
            <tr>
              <td>frontend :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.frontend}
                  onChange={(e) => onPostChange(e, "frontend")}
                />
              </td>
            </tr>
            <tr>
              <td>backend :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.backend}
                  onChange={(e) => onPostChange(e, "backend")}
                />
              </td>
            </tr>
            <tr>
              <td>description :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.description}
                  onChange={(e) => onPostChange(e, "description")}
                />
              </td>
            </tr>
            <tr>
              <td>general :</td>
              <td>
                <input
                  type="text"
                  value={blogPost.general}
                  onChange={(e) => onPostChange(e, "general")}
                />
              </td>
            </tr>
            </tbody>
          </table>
          <>
            {blogPost.contents.map((el, i) => {
              return (
                <div>
                  <h5>Add More Content</h5>
                  <table>
                    <tbody>
                    <tr>
                      <td>Header:</td>
                      <td>
                        <input
                          type="text"
                          value={el.header}
                          onChange={(e) => onContentChange(e, i, "header")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Content :</td>
                      <td>
                          <textarea
                            value={el.content}
                            onChange={(e) => onContentChange(e, i, "content")}
                          />
                      </td>
                    </tr>
                    <tr>
                      <td>Code :</td>
                      <td>
                          <textarea
                            value={el.code}
                            onChange={(e) => onContentChange(e, i, "code")}
                          />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <>
                    {blogPost.contents[i].links.map((link, j) => {
                      return (
                        <div>
                          <table>
                            <tbody>
                            <tr>
                              <td>tag :</td>
                              <td>
                                <input
                                  type="text"
                                  value={link.tag}
                                  onChange={(e) =>
                                    onLinkChange(e, i, j, "tag")
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>link :</td>
                              <td>
                                <input
                                  type="text"
                                  value={link.link}
                                  onChange={(e) =>
                                    onLinkChange(e, i, j, "link")
                                  }
                                />
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </>
                  <button onClick={() => addMoreLink(i)}>Add More Link</button>
                  <>
                    {blogPost.contents[i].images.map((image, j) => {
                      return (
                        <div>
                          <table>
                            <tbody>
                            <tr>
                              <td>image :</td>
                              <td>
                                <input
                                  type="text"
                                  value={image.image}
                                  onChange={(e) =>
                                    onImageChange(e, i, j, "image")
                                  }
                                />
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </>
                  <button onClick={() => addMoreImage(i)}>
                    Add More Image
                  </button>
                </div>
              );
            })}
          </>
          <button onClick={() => addMoreContent()}>Add More Content</button>
        </div>
        <button onClick={() => addPost()}>Add Post</button>
      </div>
    </div>
  );
}
