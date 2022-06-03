import "./home.scss";

import yub from "../../images/home/homeImageYub.png";
import me from "../../images/home/homeImageYubAndMe.jpg";

export default function Home() {
  return (
    <div className="home">
      <div className="home-left-content">
        <h1>Welcome to Jaethem8!</h1>
        <img src={yub} alt="" />
      </div>
      <div className="home-right-content">
        <div className="home-right-textbox">
          <p className="home-welcom-message">
            Welcome to portfolio/study log for growth/progress in my journey to
            software engineering
          </p>
        </div>

        <img src={me} alt="" />
      </div>
    </div>
  );
}
