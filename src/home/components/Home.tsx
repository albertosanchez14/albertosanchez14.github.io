import { Link } from "react-router-dom";

import "../image-text-section.css";
import "../sections.css";

export default function Home() {
  return (
    <div className="home-contents">
      <section className="image-text-section">
        <img src="src\assets\IMG_6590.JPG" alt="Example Image" />
        <div className="text-content">
          <h2>Alberto Sánchez del Álamo</h2>
          <p>Passionate developer.</p>
        </div>
      </section>
      <section className="hero" id="home">
        <h2>Welcome to My Website</h2>
        <p>Discover my projects, read my blog, and learn more about me.</p>
      </section>
      <section className="home-projects" id="home">
        <h1>Projects</h1>
        <p>Discover my projects, read my blog, and learn more about me.</p>
        <div>
          <div className="projects-display">
            <div className="project">
              <h2>Project 1</h2>
              <p>Project description</p>
            </div>
            <div className="project">
              <h2>Project 2</h2>
              <p>Project description</p>
            </div>
            <div className="project">
              <h2>Project 3</h2>
              <p>Project description</p>
            </div>
          </div>
          <Link to="/projects">See more</Link>
        </div>
      </section>
      <section className="home-blog">
        <h1>Blog</h1>
        <p>Discover my projects, read my blog, and learn more about me.</p>
        <div className="blog-posts">
          <div className="blog-post">
            <h2>Blog Post 1</h2>
            <p>Blog post content</p>
          </div>
          <div className="blog-post">
            <h2>Blog Post 2</h2>
            <p>Blog post content</p>
          </div>
          <div className="blog-post">
            <h2>Blog Post 3</h2>
            <p>Blog post content</p>
          </div>
        </div>
      </section>
    </div>
  );
}
