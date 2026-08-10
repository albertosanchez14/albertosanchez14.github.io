import { Link } from "@tanstack/react-router";
import { listProjects } from "../../content/portfolio";

export default function HomeProjects() {
  const projects = listProjects(2);

  return (
    <section className="flex flex-col" id="projects">
      <h2 className="motion-safe:animate-enter-right text-4xl font-semibold leading-tight sm:text-5xl">Projects</h2>
      <p className="motion-safe:animate-enter-right mt-3 text-zinc-100 [animation-delay:100ms]">Discover some of the projects I've worked on:</p>
      <div className="mt-5 flex flex-col">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="motion-safe:animate-enter-right relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-zinc-700 bg-surface p-4 text-left shadow-lg transition duration-300 hover:border-accent hover:bg-zinc-700 hover:shadow-xl [animation-delay:200ms]">
              <Link to="/projects/$slug" params={{ slug: project.slug }} className="absolute inset-0 z-0 rounded-2xl" aria-label={`View ${project.title}`} />
              <div className="pointer-events-none flex w-full flex-col">
                <h3 className="absolute left-4 top-4 text-xl font-semibold text-white drop-shadow-md">{project.title}</h3>
                <img src={project.image.src} alt={project.image.alt} id={project.image.id} className="mx-auto max-h-44 max-w-[230px] object-contain" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`} className="pointer-events-auto relative z-10 text-xl text-white transition-colors hover:text-accent"><i className="fab fa-github" /></a>
                  <div className="flex items-center gap-2">
                    {project.technologies.map((tech) => (
                      <img key={tech.id} src={tech.src} alt={tech.alt} className="h-5 w-5 object-contain" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link className="motion-safe:animate-enter-right mt-4 self-end text-muted transition-colors hover:text-white [animation-delay:350ms]" to="/projects">
          See more →
        </Link>
      </div>
    </section>
  );
}
