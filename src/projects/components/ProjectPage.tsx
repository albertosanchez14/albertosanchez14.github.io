import { Link } from "react-router-dom";

import "../styles/project-page.css";

import { ProjectType } from "../../utils/types";

export default function ProjectPage({
  // name,
  img,
  title,
  technologies,
}: ProjectType) {
  return (
    <section className="project-page">
      <div className="project-page-left-navbar">
        <Link to="/projects">Projects ←</Link>
        <div>
          <a href="#project-page-description">Description</a>
          <a href="#project-page-technologies">Technologies</a>
        </div>
      </div>
      <div className="project-page-content">
        <h1 className="project-title">{title}</h1>
        <img src={img.src} alt={img.alt} />
        <h2 id="project-page-description">Description:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien, sit amet sagittis lacus auctor pellentesque.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque facilisis luctus sapien, sit amet sagittis
          lacus auctor pellentesque. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque facilisis luctus sapien.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien, sit amet sagittis lacus auctor pellentesque.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          facilisis luctus sapien. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque facilisis luctus sapien, sit amet sagittis
          lacus auctor pellentesque. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Quisque facilisis luctus sapien.
        </p>
        <h2 id="project-page-technologies">Technologies:</h2>
        <ul>
          {technologies.map((tech, index) => (
            <li key={index}>{tech.id}</li>
          ))}
        </ul>
      </div>
      <div className="project-page-right-navbar">
        <a
          href="https://github.com/albertosanchez14/oktopusAPI"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </section>
  );
}
