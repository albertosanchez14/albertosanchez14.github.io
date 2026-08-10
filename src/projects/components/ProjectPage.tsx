import { Link } from "@tanstack/react-router";

import "../styles/project-page.css";

import { type Project } from "../../content/portfolio";

export default function ProjectPage({
  image,
  title,
  description,
  githubLink,
  features,
  technologies,
}: Project) {
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
        <img src={image.src} alt={image.alt} id={image.id} />
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
        <span>View on GitHub</span>
        <a
          href={githubLink}
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
