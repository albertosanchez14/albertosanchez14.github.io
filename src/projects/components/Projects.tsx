import { Routes, Route, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { ProjectType } from "../../utils/types";

import "../styles/projects.css";

import ProjectPage from "./ProjectPage";

export default function Projects() {
  const { data, error, isLoading } = useProjects(4);
  const projects = data as ProjectType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  // Check if the user is on a project page
  const isProjectPage = projects.some(
    (project) => location.pathname === `/projects/${project.name.toLowerCase()}`
  );

  // Prevents the user from clicking on the "coming-soon" project
  const handleClick = (event: React.MouseEvent, project: ProjectType) => {
    if (project.name === "coming-soon") {
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
        {projects.map((project: ProjectType, index: number) => (
          <Route
            key={index}
            path={`/${project.name.toLowerCase()}`}
            element={<ProjectPage {...project} />}
          />
        ))}
      </Routes>

      {!isProjectPage && (
        <section className="projects">
          <div>
            <div className="projects-display">
              {projects.map((project) => (
                <Link
                  key={project.name}
                  to={project.name.toLowerCase()}
                  className={`project ${
                    project.name === "coming-soon" ? "disabled" : ""
                  }`}
                  onClick={(event) => handleClick(event, project)}
                >
                  <div className="project-content">
                    <h2>{project.title}</h2>
                    <p>{project.resume}</p>
                    <img
                      src={project.img.src}
                      alt={`${project.img.alt}`}
                      id={project.img.id}
                    />
                    <div>
                      <div className="project-links">
                        <a
                          href={project.github_link}
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
