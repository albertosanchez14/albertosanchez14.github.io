import { Link } from "react-router-dom";

import "../assets/home-projects.css";

export default function HomeProjects() {
  return (
    <section className="home-projects" id="home">
      <h1>Projects</h1>
      <p>Discover some of the projects I've worked on:</p>
      <div>
        <div className="home-projects-display">
          <Link to="/project/project1" className="mini-project">
            <div>
              <h2>Shape Editing Web App</h2>
              <p>Project description</p>
            </div>
          </Link>
          <Link to="/project/project2" className="mini-project">
            <div>
              <h2>VHDL Simple Compiler</h2>
              <p>Project description</p>
            </div>
          </Link>
          <Link to="/project/project3" className="mini-project">
            <div>
              <h2>Oktopus API</h2>
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
