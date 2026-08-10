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
  notFoundComponent: () => <section className="not-found"><h1>Project not found</h1><p>That project does not exist.</p><Link to="/projects">View all projects</Link></section>,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Project"} | asanch` }] }),
});

function ProjectDetail() { return <ProjectPage {...Route.useLoaderData()} />; }
