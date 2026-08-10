import { createFileRoute } from "@tanstack/react-router";
import Home from "../home";

export const Route = createFileRoute("/")({ component: Home, head: () => ({ meta: [{ title: "Home | asanch" }] }) });
