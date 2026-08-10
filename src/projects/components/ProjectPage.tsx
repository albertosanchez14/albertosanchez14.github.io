import { Link } from "@tanstack/react-router";

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
    <section className="flex flex-col gap-8 pb-4 lg:flex-row lg:gap-6" aria-labelledby="project-title">
      <nav className="order-2 flex shrink-0 flex-col gap-2 text-sm text-muted lg:order-1 lg:sticky lg:top-8 lg:w-24 lg:self-start" aria-label="Project sections">
        <Link to="/projects" className="text-white transition-colors hover:text-accent">Projects ←</Link>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-2">
          <a href="#project-page-description" className="transition-colors hover:text-white">Description</a>
          <a href="#project-page-features" className="transition-colors hover:text-white">Features</a>
          <a href="#project-page-technologies" className="transition-colors hover:text-white">Technologies</a>
        </div>
      </nav>

      <div className="order-1 flex min-w-0 flex-1 flex-col lg:order-2">
        <h1 id="project-title" className="text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <img
          src={image.src}
          alt={image.alt}
          id={image.id}
          className={`my-6 max-h-80 w-full object-contain ${image.id === "vhdl_to_java_big" ? "max-w-[300px] self-center" : image.id === "shape-editing-web-app" ? "max-w-[450px] self-center" : "max-w-[200px] self-center"}`}
        />
        <h2 id="project-page-description" className="mt-2 text-2xl font-semibold">Description</h2>
        <p className="mt-2 leading-relaxed text-zinc-200">{description}</p>
        <h2 id="project-page-features" className="mt-8 text-2xl font-semibold">Features</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-200">
          {features.map((feature) => (
            <li key={feature.title}>
              <strong className="text-white">{feature.title}</strong>: {feature.description}
            </li>
          ))}
        </ul>
        <h2 id="project-page-technologies" className="mt-8 text-2xl font-semibold">Technologies</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span key={technology.id} className="rounded-full border border-zinc-700 bg-surface px-3 py-1 text-sm text-zinc-200">
              {technology.alt}
            </span>
          ))}
        </div>
      </div>

      <aside className="order-3 flex shrink-0 items-center gap-3 text-sm text-muted lg:sticky lg:top-8 lg:w-24 lg:self-start lg:flex-col lg:items-start">
        <span>View on GitHub</span>
        <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} on GitHub`} className="text-xl transition-colors hover:text-accent">
          <i className="fab fa-github" />
        </a>
      </aside>
    </section>
  );
}
