import { Routes, Route, Link, useLocation } from "react-router-dom";

import "./assets/App.css";
import "./assets/navbar.css";
import "./assets/footer.css";

import ScrollToTop from "./utils"
import Home from "./home";
import Projects from "./projects";
import Blog from "./blog";
import About from "./about";

function App() {
  const location = useLocation();

  const checkLocation = (path: string) => {
    return location.pathname === path ? "selected" : "unselected";
  };

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
          <Link to="/blog" className={checkLocation("/blog")}>
            Blog
          </Link>
          {/* <Link to="/about" className={checkLocation("/about")}>
            About
          </Link> */}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/*" element={<Projects />} />
        <Route path="/blog/*" element={<Blog />} />
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
                <Link to="/blog">Blog</Link>
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
