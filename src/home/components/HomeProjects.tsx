import { Link } from "react-router-dom";
import { listProjects } from "../../content/portfolio";

import "../styles/home-projects.css";

export default function HomeProjects() {
  const projects = listProjects(2);

  const handleGithubClick = (event: React.MouseEvent) => {
    console.log("GitHub link clicked");
    event.stopPropagation();
  };

  return (
    <section className="home-projects" id="home">
      <h1>Projects</h1>
      <p>Discover some of the projects I've worked on:</p>
      <div>
        <div className="home-projects-display">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="mini-project"
            >
              <div className="mini-project-content">
                <h2>{project.title}</h2>
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  id={project.image.id}
                />
                <div>
                  <div className="mini-project-links">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="github-link-home"
                      onClick={handleGithubClick}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                  <div className="mini-project-technologies">
                    {project.technologies.map((tech) => (
                      <img key={tech.id} src={tech.src} alt={tech.alt} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link className="see-more" to="/projects">
          See more →
        </Link>
      </div>
    </section>
  );
}
