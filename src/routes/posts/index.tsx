import { createFileRoute } from "@tanstack/react-router";
import Posts from "../../posts";

export const Route = createFileRoute("/posts/")({ component: Posts, head: () => ({ meta: [{ title: "Posts | asanch" }] }) });
