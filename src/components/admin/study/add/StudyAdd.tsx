import { useState } from "react";
import "../../../../styles/admin/post.scss";
import { Post } from "../../../../types/DTO";
import { CHANGE_EVENT } from "../../../../types/HTMLEvent";
import axios from "axios";
import {url} from "../../../../config";


export default function StudyAdd() {
    const [amount, setAmount] = useState(0);
    const [studyPost, setStudyPost] = useState<Post>({
      title: "",
      pubDate:"",
      description: "",
      contents: [],
    });
  
    const onPostChange = (e: CHANGE_EVENT, t: string) => {
      setStudyPost({
        ...studyPost,
        [t]: e.target.value,
      });
    };
  
    const onContentChange = (e: CHANGE_EVENT, i: number, t: string) => {
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents.slice(0, i),
          { ...studyPost.contents[i], [t]: e.target.value },
          ...studyPost.contents.slice(i + 1),
        ],
      });
    };
  
    const onLinkChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents.slice(0, i),
          {
            ...studyPost.contents[i],
            links: [
              ...studyPost.contents[i].links.slice(0, j),
              { ...studyPost.contents[i].links[j], [t]: e.target.value },
              ...studyPost.contents[i].links.slice(j + 1),
            ],
          },
          ...studyPost.contents.slice(i + 1),
        ],
      });
    };
  
    const onImageChange = (e: CHANGE_EVENT, i: number, j: number, t: string) => {
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents.slice(0, i),
          {
            ...studyPost.contents[i],
            images: [
              ...studyPost.contents[i].images.slice(0, j),
              { ...studyPost.contents[i].images[j], [t]: e.target.value },
              ...studyPost.contents[i].images.slice(j + 1),
            ],
          },
          ...studyPost.contents.slice(i + 1),
        ],
      });
    };
  
    const addMoreContent = () => {
      setAmount((amount) => amount + 1);
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents,
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
      console.log(studyPost);
    };
  
    const addMoreLink = (i: number) => {
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents.slice(0, i),
          {
            ...studyPost.contents[i],
            links: [
              ...studyPost.contents[i].links,
              {
                tag: "",
                link: "",
              },
            ],
          },
          ...studyPost.contents.slice(i + 1),
        ],
      });
    };
  
    const addMoreImage = (i: number) => {
      setStudyPost({
        ...studyPost,
        contents: [
          ...studyPost.contents.slice(0, i),
          {
            ...studyPost.contents[i],
            images: [
              ...studyPost.contents[i].images,
              {
                image: "",
              },
            ],
          },
          ...studyPost.contents.slice(i + 1),
        ],
      });
    };
  
    const capturePost = () => {
      setStudyPost(studyPost);
      console.log(studyPost);
    };
  
    const addPost = () => {
      capturePost();
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
  
    return (
      <div className="post-wrapper">
        <div className="post-content">
          <h3>Add a Project Post</h3>
          <div className="add-project-post">
            <table>
              <tbody>
                <tr>
                  <td>title : </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => onPostChange(e, "title")}
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
              </tbody>
            </table>
            <>
              {studyPost.contents.map((el, i) => {
                return (
                  <div>
                    <h5>Add More Content</h5>
                    <table>
                      <tbody>
                        <tr>
                          <td>Header: </td>
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
                      </tbody>
                    </table>
                    <>
                      {studyPost.contents[i].links.map((link, j) => {
                        return (
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>tag : </td>
                                  <td>
                                    <input
                                      type="text"
                                      onChange={(e) =>
                                        onLinkChange(e, i, j, "tag")
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>link : </td>
                                  <td>
                                    <input
                                      type="text"
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
                      {studyPost.contents[i].images.map((image, j) => {
                        return (
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>image : </td>
                                  <td>
                                    <input
                                      type="text"
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
  