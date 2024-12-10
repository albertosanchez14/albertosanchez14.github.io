import { Link } from "react-router-dom";

import "../assets/projects.css";

export default function Projects() {
  return (
    <section className="projects">
      {/* <h1>Projects</h1>
      <p>Here are some of the projects I've worked on:</p> */}
      <div>
        <div className="projects-display">
          <Link to="/project/project1" className="project">
            <div className="project-content">
              <h2>Shape Editing Web App</h2>
              <img src="src/projects/assets/a3-screencap.png" alt="Project 1" />
              <div className="project-technologies">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
              </div>
            </div>
          </Link>
          <Link to="/project/project2" className="project">
            <div className="project-content">
              <h2>Shape Editing Web App</h2>
              <img src="src/projects/assets/a3-screencap.png" alt="Project 1" />
              <div className="project-technologies">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
              </div>
            </div>
          </Link>
          <Link to="/project/project3" className="project">
            <div className="project-content">
              <h2>Shape Editing Web App</h2>
              <img src="src/projects/assets/a3-screencap.png" alt="Project 1" />
              <div className="project-technologies">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
              </div>
            </div>
          </Link>
          <Link to="/project/project4" className="project">
            <div className="project-content">
              <h2>Shape Editing Web App</h2>
              <img src="src/projects/assets/a3-screencap.png" alt="Project 1" />
              <div className="project-technologies">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
