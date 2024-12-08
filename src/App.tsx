import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "./assets/navbar.css";
import "./assets/footer.css";

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

      <footer className="site-footer">
        <div className="footer-content">
          {/* <!-- Contact Section --> */}
          <div className="contact-info">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:your-email@example.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://github.com/your-username"
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
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#about">About</a>
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
