import { createFileRoute } from "@tanstack/react-router";
import Home from "../home";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Alberto Sánchez — Software Engineer" },
      {
        name: "description",
        content:
          "Alberto Sánchez del Álamo. Software Engineer based in Madrid.",
      },
    ],
  }),
});
