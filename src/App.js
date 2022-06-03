import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./app.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/courses" />
          <Route path="/contact" />
          <Route path="/projects" />
          <Route path="/" exact element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
