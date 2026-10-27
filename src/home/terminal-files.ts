import avatar from "../../public/avatar.txt?raw";
import { listProjects } from "../content/portfolio";

export type TerminalFile = { type: "file"; content: string };
export type TerminalDirectory = {
  type: "directory";
  children: Record<string, TerminalNode>;
};
export type TerminalNode = TerminalFile | TerminalDirectory;

const projectFiles = Object.fromEntries(
  listProjects().map((project) => [
    `${project.slug}.md`,
    {
      type: "file" as const,
      content: [
        `# ${project.title}`,
        "",
        project.resume,
        "",
        `Stack: ${project.technologies.map((technology) => technology.alt).join(", ")}`,
        `Source: ${project.githubLink}`,
      ].join("\n"),
    },
  ]),
);

export const fileSystem: TerminalDirectory = {
  type: "directory",
  children: {
    "avatar.txt": { type: "file", content: avatar },
    "about.txt": {
      type: "file",
      content: [
        "Alberto Sánchez del Álamo",
        "Software Engineer based in Madrid, Spain.",
        "",
        "Computer Engineering at Universidad Carlos III de Madrid.",
        "University of Waterloo.",
        "Software Engineer at GMV.",
      ].join("\n"),
    },
    projects: { type: "directory", children: projectFiles },
    books: {
      type: "directory",
      children: {
        "README.md": {
          type: "file",
          content: "# Books\n\nMy reading list is coming soon.",
        },
      },
    },
    contact: {
      type: "directory",
      children: {
        "email.txt": {
          type: "file",
          content: "alberto.sanchez.delalamo@gmail.com",
        },
        "links.txt": {
          type: "file",
          content: [
            "GitHub: https://github.com/albertosanchez14",
            "LinkedIn: https://linkedin.com/in/alberto-sanchez-del-alamo",
          ].join("\n"),
        },
      },
    },
  },
};

export function resolvePath(currentPath: string[], target: string): string[] {
  const absolute = target.startsWith("/") || target.startsWith("~");
  const segments = target.replace(/^~/, "").split("/");
  const path = absolute ? [] : [...currentPath];

  for (const segment of segments) {
    if (!segment || segment === ".") continue;
    if (segment === "..") path.pop();
    else path.push(segment);
  }

  return path;
}

export function getNode(path: string[]): TerminalNode | undefined {
  let node: TerminalNode = fileSystem;
  for (const segment of path) {
    if (node.type !== "directory") return undefined;
    node = node.children[segment];
    if (!node) return undefined;
  }
  return node;
}

export function displayPath(path: string[]): string {
  return path.length ? `~/${path.join("/")}` : "~";
}
