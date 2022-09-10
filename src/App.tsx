import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./app.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";
import Admin from "./components/admin/Admin";
import BlogPosts from "./components/blog/BlogPosts";
import BlogPost from "./components/blog/content/BlogPost";
import StudyPosts from "./components/study/StudyPosts";
import StudyPost from "./components/study/content/StudyPost";

import Login from "./components/admin/login/Login";
import BlogAdd from "./components/admin/blog/add/BlogAdd";
function App() {
  return (
    <div className="app">
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/admin/login" element={<Login />} />

            {/*<Route path="/admin/study/add" element={<StudyAdd />} />*/}
            {/*<Route path="/admin/study/edit/:title" element={<StudyEdit />} />*/}

            <Route path="/admin/projects/add" element={<BlogAdd />} />
            {/*<Route*/}
            {/*  path="/admin/projects/edit/:title"*/}
            {/*  element={<ProjectEdit />}*/}
            {/*/>*/}

            <Route path="/admin" element={<Admin />} />
            <Route path="/courses" element={<Courses />} />

            <Route path="/study" element={<StudyPosts />} />
            <Route path="/study/:title" element={<StudyPost />} />

            <Route path="/projects" element={<BlogPosts />} />
            <Route path="/project/:title" element={<BlogPost />} />

            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
