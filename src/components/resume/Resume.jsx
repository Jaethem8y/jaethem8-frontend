import "./resume.scss";
import resume2022 from "./Resume2022.pdf";

import { Document, Page } from "react-pdf";

export default function Resume() {
  return (
    <div className="resume-wrapper">
      <div className="resume-content">
        <div className="resume-header">
          <h1>Jaehyeok Choi</h1>
          <p>Des Moines, IA, 50311 </p>
          <p>jaehyeok.choi@drake.edu</p>
        </div>
        <hr />
        <h2>Education</h2>
        <div className="resume-education">
          <div className="resume-school">
            <h4>Drake University - Des Moines, IA</h4>
            <p>BS Computer Science : May 2023</p>
          </div>
          <hr />
        </div>
        <h2>Professional Experience</h2>
        <div className="resume-professional">
          <h4>Farmers Mutual Hail</h4>
          <p>Software Developer Intern : May 2022 - Aug 2022</p>
        </div>
        <hr />
        <h2>Competitions && Community Involvement</h2>
        <div className="resume-involvement">
          <h4>
            CCSC Conference Mid Plains Poster Competition 3rd Place - Bank API
          </h4>
          <p>
            - won 3rd place at the poster conference with BankAPI and UI project
          </p>
          <h4>Devs Do Good </h4>
          <p>
            - Event for computer science students to pair up with mentors who
            are currently software engineers to build websites for non-profit
            organizations.
          </p>
        </div>
      </div>
    </div>
  );
}
