import { useState } from "react";

import "./App.css";
import "./navbar.css";
import "./image-text-section.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="navbar">
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/projects">Projects</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
        </div>
      </div>
      <div className="home-contents">
      <section className="image-text-section">
        <img src="src\assets\IMG_6590.JPG" alt="Example Image" />
        <div className="text-content">
          <h2>Alberto Sánchez del Álamo</h2>
          <p>
            Passionate developer.
          </p>
        </div>
      </section>
      <section className="hero" id="home">
        <h1>Welcome to My Website</h1>
        <p>Discover my projects, read my blog, and learn more about me.</p>
      </section>
      <section className="home-projects" id="home">
        <h1>Projects</h1>
        <p>Discover my projects, read my blog, and learn more about me.</p>
      </section>
      </div>
    </>
  );
}

export default App;
