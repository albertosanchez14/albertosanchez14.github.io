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
        <p>
          Discover my projects, read my blog, and learn more about me. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Quisque facilisis
          luctus sapien, sit amet sagittis lacus auctor pellentesque. Vivamus
          sit amet viverra nisl, sed consectetur risus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien, sit amet sagittis lacus auctor pellentesque.
          Vivamus sit amet viverra nisl, sed consectetur risus. Etiam egestas
          ultrices lacus, lacinia euismod urna venenatis at. Proin aliquet
          rutrum sem vitae scelerisque.
        </p>
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
          <Link className="see-more" to="/projects">
            See more →
          </Link>
        </div>
      </section>
      <section className="home-blog">
        <h1>Blog</h1>
        <p>Discover my projects, read my blog, and learn more about me.</p>
        <ul className="blog-posts">
          <li className="blog-post">
            <span>Dec 8, 2024</span>
            <h2 className="home-blog-title">
              <Link to="/blog/post-1">Blog Post 1</Link>
            </h2>
            <p className="home-blog-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              facilisis luctus sapien, sit amet sagittis lacus auctor
              pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Quisque facilisis luctus sapien.
            </p>
          </li>
          <li className="blog-post">
            <span>Dec 8, 2024</span>
            <h2 className="home-blog-title">
              <Link to="/blog/post-2">Blog Post 2</Link>
            </h2>
            <p className="home-blog-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              facilisis luctus sapien, sit amet sagittis lacus auctor
              pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Quisque facilisis luctus sapien.
            </p>
          </li>
          <li className="blog-post">
            <span>Dec 8, 2024</span>
            <h2 className="home-blog-title">
              <Link to="/blog/post-3">Blog Post 3</Link>
            </h2>
            <p className="home-blog-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              facilisis luctus sapien, sit amet sagittis lacus auctor
              pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Quisque facilisis luctus sapien.
            </p>
          </li>
        </ul>
        <Link className="see-more" to="/blog">
          See more →
        </Link>
      </section>
    </div>
  );
}
