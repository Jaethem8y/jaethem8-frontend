import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./app.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";
import Resume from "./components/resume/Resume";
import Admin from "./components/admin/Admin";
import ProjectAdd from "./components/admin/project/add/ProjectAdd";
import StudyAdd from "./components/admin/study/add/StudyAdd";
import PersonalAdd from "./components/admin/personal/add/PersonalAdd";

import Test from "./components/test/Test";
import Login from "./components/admin/login/Login";
import ProjectEdit from "./components/admin/project/edit/ProjectEdit";
import PersonalEdit from "./components/admin/personal/edit/PersonalEdit";
import StudyEdit from "./components/admin/study/edit/StudyEdit";

function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/test" element={<Test />} />

            <Route path="/admin/login" element={<Login />} />

            <Route path="/admin/study/add" element={<StudyAdd />} />
            <Route path="/admin/study/edit/:title" element={<StudyEdit />} />

            <Route path="/admin/projects/add" element={<ProjectAdd />} />
            <Route
              path="/admin/projects/edit/:title"
              element={<ProjectEdit />}
            />

            <Route path="/admin/personal/add" element={<PersonalAdd />} />
            <Route
              path="/admin/personal/edit/:title"
              element={<PersonalEdit />}
            />

            <Route path="/admin" element={<Admin />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/study" />
            <Route path="/projects" />
            <Route path="/contact" element={<Resume />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
