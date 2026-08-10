import { createFileRoute } from "@tanstack/react-router";
import Projects from "../../projects";

export const Route = createFileRoute("/projects/")({ component: Projects, head: () => ({ meta: [{ title: "Projects | asanch" }] }) });
