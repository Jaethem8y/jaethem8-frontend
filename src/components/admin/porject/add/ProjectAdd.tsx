import "./projectAdd.scss";

import { useState, useRef } from "react";
import { title } from "process";

type BlogContent = {
  title: string;
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

  const addMoreContent = () => {
    setAmount((amount) => amount + 1);
    const { title, role, frontend, backend, general, contents } = blogPost;
    setBlogPost({
      title,
      role,
      frontend,
      backend,
      general,
      contents: [
        ...contents,
        {
          title: "",
          location: 0,
          content: "",
          image: "",
          code: "",
        },
      ],
    });
  };

  return (
    <div className="add-project-wrapper">
      <div className="add-project-content">
        <h3>Add a Project Post</h3>
        <div className="add-porject-post">
          <table>
            <tr>
              <td>title : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>role : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>frontend : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>backend : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>general : </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </table>
          {Array.from(Array(amount), (e, i) => {
            return (
              <div className="add-project-objecs">
                <hr />
                <h5>Add More Content</h5>
                <table>
                  <tr>
                    <td>Title : </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Location : </td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                  <tr>
                    <td>Image : </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Content : </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>Code : </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
          <button onClick={addMoreContent}>Add More Content</button>
        </div>
      </div>
    </div>
  );
}
