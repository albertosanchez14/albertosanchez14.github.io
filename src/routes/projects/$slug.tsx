import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ProjectPage from "../../projects/components/ProjectPage";
import { getProjectBySlug } from "../../content/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <section className="px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold">Project not found</h1>
      <p className="mt-3 text-muted">That project does not exist.</p>
      <Link className="mt-6 inline-block text-accent transition-colors hover:text-white" to="/projects">
        View all projects
      </Link>
    </section>
  ),
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Project"} | asanch` }] }),
});

function ProjectDetail() { return <ProjectPage {...Route.useLoaderData()} />; }
