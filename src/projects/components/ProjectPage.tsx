import { Link } from "react-router-dom";

import "../styles/project-page.css";

import { ProjectType } from "../../utils/types";

export default function ProjectPage({
  img,
  title,
  description,
  github_link,
  features,
  technologies,
}: ProjectType) {
  return (
    <section className="project-page">
      <div className="project-page-left-navbar">
        <Link to="/projects">Projects ←</Link>
        <div>
          <a href="#project-page-description">Description</a>
          <a href="#project-page-features">Features</a>
          <a href="#project-page-technologies">Technologies</a>
        </div>
      </div>
      <div className="project-page-content">
        <h1 className="project-title">{title}</h1>
        <img src={img.src} alt={img.alt} id={img.id}/>
        <h2 id="project-page-description">Description</h2>
        <p>{description}</p>
        <h2 id="project-page-features">Features</h2>
        <ul className="project-page-features">
          {features.map((feat, index) => (
            <li key={index}>
              <p className="feature">
                <strong>{feat.title}</strong>: {feat.description}
              </p>
            </li>
          ))}
        </ul>
        <h2 id="project-page-technologies">Technologies</h2>
        <div className="technologies">
          {technologies.map((tech) => (
            <span key={tech.id} className="project-page-technologies">
              {tech.alt}
            </span>
          ))}
        </div>
      </div>
      <div className="project-page-right-navbar">
        <a
          href={github_link}
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
