import { createFileRoute } from "@tanstack/react-router";
import About from "../about";

export const Route = createFileRoute("/about")({ component: About, head: () => ({ meta: [{ title: "About | asanch" }] }) });
