import { themes } from "./themes";
import { fileSystem, getNode, resolvePath, type TerminalDirectory } from "./terminal-files";

export const shellCommands = ["help", "theme", "ls", "cd", "cat", "tree", "pwd", "whoami", "clear", "c", "history", "z", "v", "vim", "nvim"];

export function fuzzyMatch(value: string, query: string): boolean {
  const source = value.toLowerCase();
  const needle = query.toLowerCase();
  let position = 0;
  for (const character of needle) {
    position = source.indexOf(character, position);
    if (position === -1) return false;
    position += 1;
  }
  return true;
}

function directoryPaths(directory: TerminalDirectory, parent: string[] = []): string[][] {
  return Object.entries(directory.children).flatMap(([name, node]) => {
    if (node.type !== "directory") return [];
    const path = [...parent, name];
    return [path, ...directoryPaths(node, path)];
  });
}

export function fuzzyDirectory(query: string, visits: Record<string, number>): string[] | undefined {
  const matches = directoryPaths(fileSystem).filter((path) =>
    fuzzyMatch(path.join("/"), query.replace(/^~\/?/, "")),
  );
  return matches.sort((a, b) => {
    const aName = a[a.length - 1].toLowerCase();
    const bName = b[b.length - 1].toLowerCase();
    const needle = query.toLowerCase();
    const aScore = (aName.startsWith(needle) ? 100 : 0) + (visits[a.join("/")] ?? 0);
    const bScore = (bName.startsWith(needle) ? 100 : 0) + (visits[b.join("/")] ?? 0);
    return bScore - aScore || a.length - b.length;
  })[0];
}

export function completions(input: string, currentPath: string[]): string[] {
  const parts = input.trimStart().split(/\s+/);
  if (parts[0] === "theme" && parts.length > 1) {
    if (parts.length === 2) return ["-l", "--list", "-s", "--set"].filter((flag) => flag.startsWith(parts[1])).map((flag) => `theme ${flag}${["-s", "--set"].includes(flag) ? " " : ""}`);
    if (["-s", "--set"].includes(parts[1]) && parts.length === 3) return themes.filter((theme) => fuzzyMatch(theme, parts[2])).map((theme) => `theme ${parts[1]} ${theme}`);
    return [];
  }
  const separator = input.lastIndexOf(" ");
  if (separator === -1) {
    return shellCommands.filter((command) => fuzzyMatch(command, input)).map((command) => command + " ");
  }

  const operation = input.slice(0, separator).trim().split(/\s+/)[0];
  if (!["cd", "z", "ls", "cat", "tree", "v", "vim", "nvim"].includes(operation)) return [];

  const prefix = input.slice(0, separator + 1);
  const argument = input.slice(separator + 1);
  const slash = argument.lastIndexOf("/");
  const directoryPart = slash === -1 ? "" : argument.slice(0, slash + 1);
  const search = slash === -1 ? argument : argument.slice(slash + 1);
  const directory = getNode(resolvePath(currentPath, directoryPart || "."));
  if (!directory || directory.type !== "directory") return [];

  return Object.entries(directory.children)
    .filter(([name, node]) => (operation !== "cd" && operation !== "z" || node.type === "directory") && fuzzyMatch(name, search))
    .sort(([a], [b]) => Number(b.toLowerCase().startsWith(search.toLowerCase())) - Number(a.toLowerCase().startsWith(search.toLowerCase())))
    .map(([name, node]) => `${prefix}${directoryPart}${name}${node.type === "directory" ? "/" : ""}`);
}
