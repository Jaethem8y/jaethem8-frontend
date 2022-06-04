import "./home.scss";

import yub from "../../images/home/homeImageYub.png";
import me from "../../images/home/homeImageYubAndMe.jpg";

export default function Home() {
  return (
    <div className="home">
      <div className="home-left-content">
        <h1 style={{ textAlign: "center" }}>
          <code>// Steady but Surely</code>
        </h1>
        <img src={yub} alt="" />
      </div>
      <div className="home-right-content">
        <div className="home-right-textbox">
          <h5 className="home-welcom-message">
            <code>
              Welcome to portfolio/study log for growth/progress in my journey
              to software engineering.
              <br />
              <br />
              - Courses: View courses that I have taken
              <br />- Study: View my progress log in algorithm/coding
              <br />- Projects: View my Projects
              <br />- Resume/Contact: View my resume and contact info
              <br />- Github: Direct link to my github repo
            </code>
          </h5>
        </div>
        <div className="home-right-content-pictureframe">
          <img src={me} alt="" />
        </div>
      </div>
    </div>
  );
}
