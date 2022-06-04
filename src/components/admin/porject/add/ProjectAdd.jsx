import "./projectAdd.scss";

import { useState, useRef } from "react";

export default function ProjectAdd() {
  const [blogPost, setBlogPost] = useState({
    
  });



  return (
    <div className="projectAdd-wrapper">
      <div className="projectAdd-content">
        <h3>Add a project</h3>
        <br />
        <p>
          Title <input type="text" className="title" />
          Date <input type="text" className="date" />
          Time <input type="text" className="time" />
        </p>
        <br />
        <div className="project-content-box">
          <p>
            content location <input type="text" className="location" />
          </p>
          <p>Content</p>
          <textarea className="textbox" cols="30" rows="10"></textarea>
          <button>Attach content</button>
        </div>
        <br />
        <div className="project-code-box">
          code location <input type="text" className="location" />
          <p>Content</p>
          <textarea className="textbox" cols="30" rows="10"></textarea>
          <button>Attach code</button>
        </div>
        <br />
        <br />
        <div className="project-image-box">
          image location <input type="text" className="location" />
          <br />
          attach image <input type="file" className="file-input" />
          <button>Attach image</button>
        </div>
        <br />
        <div className="send">
          <button>Create Project</button>
        </div>
      </div>
    </div>
  );
}
