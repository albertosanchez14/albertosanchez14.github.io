import { Link } from "react-router-dom";
import { useProjects } from "../../projects/hooks/useProjects";
import { ProjectType } from "../../utils/types";

import "../styles/home-projects.css";

export default function HomeProjects() {
  const { data, error, isLoading } = useProjects(3);
  const projects = data as ProjectType[];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <section className="home-projects" id="home">
      <h1>Projects</h1>
      <p>Discover some of the projects I've worked on:</p>
      <div>
        <div className="home-projects-display">
          {projects.map((project) => (
            <Link
              key={project.name}
              to={`/projects/${project.name}`}
              className="mini-project"
            >
              <div className="mini-project-content">
                <h2>{project.title}</h2>
                <img
                  src={project.img.src}
                  alt={project.img.alt}
                  id={project.img.id}
                />
                <div className="mini-project-technologies">
                  {project.technologies.map((tech) => (
                    <img key={tech.id} src={tech.src} alt={tech.alt} />
                  ))}
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
