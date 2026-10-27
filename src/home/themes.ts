export const themes = ["carbon", "mocha", "nord", "dracula", "gruvbox", "paper"] as const;
export type Theme = typeof themes[number];
