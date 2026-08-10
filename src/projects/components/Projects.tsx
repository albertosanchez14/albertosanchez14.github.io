import { Link } from "@tanstack/react-router";

import { listProjects } from "../../content/portfolio";

export default function Projects() {
  const projects = listProjects();

  return (
    <section className="flex flex-col pb-4" aria-labelledby="projects-title">
      <h1 id="projects-title" className="motion-safe:animate-enter-right text-4xl font-semibold leading-tight sm:text-5xl">
        Projects
      </h1>
      <p className="motion-safe:animate-enter-right mt-3 text-zinc-100 [animation-delay:100ms]">
        Discover some of the projects I&apos;ve worked on:
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="motion-safe:animate-enter-down relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-zinc-700 bg-surface p-4 text-left shadow-lg transition duration-300 hover:border-accent hover:bg-zinc-700 hover:shadow-xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="absolute inset-0 z-0 rounded-2xl"
              aria-label={`View ${project.title}`}
            />
            <div className="pointer-events-none flex w-full flex-col">
              <h2 className="absolute left-4 top-4 text-xl font-semibold text-white drop-shadow-md">
                {project.title}
              </h2>
              <p className="absolute left-4 top-12 max-w-[calc(100%-2rem)] text-sm text-zinc-200 drop-shadow-md">
                {project.resume}
              </p>
              <img
                src={project.image.src}
                alt={project.image.alt}
                id={project.image.id}
                className={`mx-auto max-h-48 object-contain ${project.image.id === "vhdl_to_java_big" ? "max-w-[250px]" : "max-w-[300px]"}`}
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="pointer-events-auto relative z-10 text-xl text-white transition-colors hover:text-accent"
                >
                  <i className="fab fa-github" />
                </a>
                <div className="flex items-center gap-2" aria-label="Technologies">
                  {project.technologies.map((tech) => (
                    <img key={tech.id} src={tech.src} alt={tech.alt} className="h-5 w-5 object-contain" />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
