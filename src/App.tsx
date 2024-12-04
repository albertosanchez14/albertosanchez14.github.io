import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "./assets/navbar.css";

import Home from "./home";
import Projects from "./projects";
import Blog from "./blog";
import About from "./about";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
