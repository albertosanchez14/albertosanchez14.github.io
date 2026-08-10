import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { listProjects, type Project } from "../../content/portfolio";

import "../styles/projects.css";

import ProjectPage from "./ProjectPage";

export default function Projects() {
  const projects = listProjects();

  // Check if the user is on a project page
  const isProjectPage = projects.some(
    (project) => location.pathname === `/projects/${project.slug}`
  );

  // Prevents the user from clicking on the "coming-soon" project
  const handleClick = (event: React.MouseEvent, project: Project) => {
    if (project.slug === "coming-soon") {
      event.preventDefault();
    }
  };
  // Prevents the click event from propagating to the parent elements
  const handleGithubClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <Routes>
        {projects.map((project) => (
          <Route
            key={project.slug}
            path={`/${project.slug}`}
            element={<ProjectPage {...project} />}
          />
        ))}
      </Routes>

      {!isProjectPage && (
        <section className="projects">
          <div>
            <div className="projects-display">
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  to={project.slug}
                  className={`project ${
                    project.slug === "coming-soon" ? "disabled" : ""
                  }`}
                  style={{
                    animation: `slide-down 1s ease-out forwards`,
                    animationDelay: `${index * 0.25}s`,
                    zIndex: `${projects.length - index}`,
                  }}
                  onClick={(event) => handleClick(event, project)}
                >
                  <div className="project-content">
                    <h2>{project.title}</h2>
                    <p>{project.resume}</p>
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      id={project.image.id}
                    />
                    <div>
                      <div className="project-links">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="github-link"
                          onClick={handleGithubClick}
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                      <div className="project-technologies">
                        {project.technologies.map((tech) => (
                          <img key={tech.id} src={tech.src} alt={tech.alt} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
