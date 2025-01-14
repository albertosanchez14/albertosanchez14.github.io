import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/footer.css";

import ScrollToTop from "./utils";
import Home from "./home";
import Projects from "./projects";
import Posts from "./posts";
import About from "./about";

function App() {
  const location = useLocation();

  const checkLocation = (path: string) => {
    const currentPath = location.pathname;
    const currentPathArray = currentPath.split("/");
    const pathArray = path.split("/");
    return currentPathArray[1] === pathArray[1] ? "selected" : "unselected";
  };

  useEffect(() => {
    // Set the title of the page based on the current path
    const path = location.pathname;
    const title =
      path === "/"
        ? "Home"
        : path.split("/")[1].charAt(0).toUpperCase() +
          path.split("/")[1].slice(1);
    document.title = `${title} | asanch`;
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <div className="navbar">
        <div className="nav-links">
          <Link to="/" className={checkLocation("/")}>
            Home
          </Link>
          <Link to="/projects" className={checkLocation("/projects")}>
            Projects
          </Link>
          <Link to="/posts" className={checkLocation("/blog")}>
            Posts
          </Link>
          <Link to="/about" className={checkLocation("/about")}>
            About
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/*" element={<Projects />} />
        <Route path="/posts/*" element={<Posts />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="site-footer">
        <div className="footer-content">
          {/* <!-- Contact Section --> */}
          <div className="contact-info">
            <a
              href="mailto:alberto.sanchez.delalamo@gmail.com"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://linkedin.com/in/alberto-sanchez-del-alamo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/albertosanchez14"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          {/* <!-- Navigation Links --> */}
          <div className="footer-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Copyright Section --> */}
        <div className="footer-bottom">
          <p>&copy; 2024 Alberto Sánchez del Álamo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
