import "./projectAdd.scss";

import { useState, useRef } from "react";

export default function ProjectAdd() {
  const [blogPost, setBlogPost] = useState({
    pubDate: "",
    pubTime: "",
    title: "",
    blogContents: [],
    blogImages: [],
    blogCodes: [],
  });
  const [blogContent, setBlogContent] = useState({
    location: "",
    content: "",
  });
  const [blogImage, setBlogImage] = useState({
    location: "",
    Image: null,
  });
  const [blogCode, setBlogCode] = useState({
    location: "",
    code: "",
  });
  const blogTitle = useRef();
  const blogDate = useRef();
  const blogTime = useRef();

  const contentLocation = useRef();
  const contentContent = useRef();

  const codeLocation = useRef();
  const codeCode = useRef();

  const imageLocation = useRef();
  const imageImage = useRef();

  const addProjectContent = () => {
    const location = contentLocation.current.value;
    const content = contentContent.current.value;

    setBlogContent({
      location,
      content,
    });

    setBlogPost({
      ...blogPost,
      blogContents: [...blogPost.blogContents, blogContent],
    });
    console.log(blogPost);
  };

  const addProjectCode = () => {
    const location = codeLocation.current.value;
    const content = codeCode.current.value;

    setBlogCode({
      location,
      content,
    });

    setBlogPost({
      ...blogPost,
      blogCodes: [...blogPost.blogCodes, blogCode],
    });
    console.log(blogPost);
  };

  const addProjectImage = () => {
    const location = imageLocation.current.value;
    const content = imageImage.current.value;

    setBlogImage({
      location,
      content,
    });

    setBlogPost({
      ...blogPost,
      blogImages: [...blogPost.blogImages, blogImage],
    });
    console.log(blogPost);
  };

  const submitBlogPost = () => {
    const title = blogTitle.current.value;
    const pubDate = blogDate.current.value;
    const pubTime = blogTime.current.value;

    setBlogPost(...setBlogPost, title, pubDate, pubTime);
    console.log(blogPost);
  };

  return (
    <div className="projectAdd-wrapper">
      <div className="projectAdd-content">
        <h3>Add a project</h3>

        <br />
        <p>
          Title <input type="text" className="title" ref={blogTitle} />
          Date <input type="text" className="date" ref={blogDate} />
          Time <input type="text" className="time" ref={blogTime} />
        </p>
        <br />

        <div className="project-content-box">
          <p>
            content location{" "}
            <input type="text" className="location" ref={contentLocation} />
          </p>
          <p>Content</p>
          <textarea
            className="textbox"
            cols="30"
            rows="10"
            ref={contentContent}
          ></textarea>
          <button onClick={addProjectContent}>Attach content</button>
        </div>

        <br />

        <div className="project-code-box">
          code location{" "}
          <input type="text" className="location" ref={codeLocation} />
          <p>Content</p>
          <textarea
            className="textbox"
            cols="30"
            rows="10"
            ref={codeCode}
          ></textarea>
          <button onClick={addProjectCode}>Attach code</button>
        </div>

        <br />
        <br />

        <div className="project-image-box">
          image location{" "}
          <input type="text" className="location" ref={imageLocation} />
          <br />
          attach image{" "}
          <input type="file" className="file-input" ref={imageImage} />
          <button onClick={addProjectImage}>Attach image</button>
        </div>

        <br />
        <div className="send">
          <button onClick={submitBlogPost}>Create Project</button>
        </div>
      </div>
    </div>
  );
}
