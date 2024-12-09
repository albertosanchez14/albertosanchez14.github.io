import { Link } from "react-router-dom";

import "../assets/home-projects.css";

export default function HomeProjects() {
  return (
    <section className="home-projects" id="home">
      <h1>Projects</h1>
      <p>Discover my projects, read my blog, and learn more about me.</p>
      <div>
        <div className="projects-display">
          <Link to="/project/project1" className="project">
            <div>
              <h2>Project 1</h2>
              <p>Project description</p>
            </div>
          </Link>
          <Link to="/project/project2" className="project">
            <div>
              <h2>Project 2</h2>
              <p>Project description</p>
            </div>
          </Link>
          <Link to="/project/project3" className="project">
            <div>
              <h2>Project 3</h2>
              <p>Project description</p>
            </div>
          </Link>
        </div>
        <Link className="see-more" to="/projects">
          See more →
        </Link>
      </div>
    </section>
  );
}
