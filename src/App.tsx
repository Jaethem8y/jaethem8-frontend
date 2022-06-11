import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./app.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Courses from "./components/courses/Courses";
import Resume from "./components/resume/Resume";
import Admin from "./components/admin/Admin";
import ProjectAdd from "./components/admin/porject/add/ProjectAdd";
import Test from "./components/test/Test";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/test" element={<Test />} />

          <Route path="/admin/study/add" />
          <Route path="/admin/study" />

          <Route path="/admin/projects/add" element={<ProjectAdd />} />
          <Route path="/admin/projects" />

          <Route path="/admin" element={<Admin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/study" />
          <Route path="/projects" />
          <Route path="/contact" element={<Resume />} />
          <Route path="/"  element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
