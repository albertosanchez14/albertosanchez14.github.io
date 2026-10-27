import { expect, test } from "@playwright/test";

test("intro types, reveals the portrait, and replays on a repeat visit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "skip intro" })).toBeVisible();
  await page.clock.runFor(500);
  await expect(page.locator(".boot-command")).toContainText("cat");
  await expect(page.locator(".profile-output")).toHaveCount(0);
  await page.clock.runFor(2000);
  await expect(page.getByRole("heading", { name: "Alberto Sánchez del Álamo" })).toBeVisible();
  await expect(page.getByRole("img", { name: "ASCII portrait" })).toBeVisible();
  await page.clock.runFor(2000);
  await expect(page.locator(".boot-list-command")).toHaveText("asanch@portfolio~❯ ls");
  await expect(page.locator(".intro-listing")).toContainText("projects/");
  await expect(page.getByRole("navigation", { name: "Explore portfolio" })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("button", { name: "skip intro" })).toBeVisible();
  await page.getByRole("button", { name: "skip intro" }).click();
  await expect(page.getByRole("heading", { name: "Alberto Sánchez del Álamo" })).toBeVisible();
});

test("shell navigation, completion, history and clear remain usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const input = page.getByRole("combobox", { name: "Terminal command" });
  await input.fill("cat about");
  await input.press("Tab");
  await expect(input).toHaveValue("cat about.txt");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("Software Engineer based in Madrid");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("cat about.txt");
  await input.fill("ls projects");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("oktopus-api.md");
  await input.fill("clear");
  await input.press("Enter");
  await expect(page.locator(".profile-output")).toHaveCount(0);
  await expect(page.locator(".terminal-content")).toBeEmpty();
  await input.fill("cat avatar.txt about.txt");
  await input.press("Enter");
  await expect(page.locator(".terminal-content .profile-output")).toContainText("Software Engineer");
});

test("mobile fits the viewport and theme commands work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator(".terminal-window")).toHaveClass(/theme-carbon/);
  await page.getByRole("combobox", { name: "Terminal command" }).fill("theme -s mocha");
  await page.getByRole("combobox", { name: "Terminal command" }).press("Enter");
  await expect(page.locator(".terminal-window")).toHaveClass(/theme-mocha/);
  for (const theme of ["nord", "dracula", "gruvbox", "paper"]) {
    await page.getByRole("combobox", { name: "Terminal command" }).fill(`theme --set ${theme}`);
    await page.getByRole("combobox", { name: "Terminal command" }).press("Enter");
    await expect(page.locator(".terminal-window")).toHaveClass(new RegExp(`theme-${theme}`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.reload();
  await expect(page.locator(".terminal-window")).toHaveClass(/theme-paper/);
  const input = page.getByRole("combobox", { name: "Terminal command" });
  await input.fill("theme -l");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("paper (active)");
  await input.fill("theme --list");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("carbon");
  await input.fill("help");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("theme -l, --list");
  await expect(page.locator(".terminal-content")).toContainText("theme -s, --set <name>");
  await input.fill("theme --set invalid");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("Unknown theme: invalid");
  await expect(page.locator(".terminal-window")).toHaveClass(/theme-paper/);
  await input.fill("theme -s nor");
  await input.press("Tab");
  await expect(input).toHaveValue("theme -s nord");
  await input.fill("ls");
  await input.press("Enter");
  await expect(page.locator(".terminal-content .terminal-listing")).toContainText("projects/");
  await page.locator(".terminal-listing").getByRole("button", { name: "projects/", exact: true }).click();
  await expect(page.locator(".terminal-current-path")).toHaveText("~/projects");
  await page.screenshot({ path: "/tmp/terminal-paper-mobile.png" });
});


test("portrait diffusion and text resolve after the typed command", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/");
  await page.clock.runFor(1750);
  const portrait = page.locator(".ascii-avatar .reveal-text > [aria-hidden]");
  const initial = await portrait.textContent();
  const name = page.locator("h1 > .reveal-text > [aria-hidden]");
  await expect(name).not.toHaveText("Alberto Sánchez");
  await page.clock.runFor(1800);
  await expect(name).toHaveText("Alberto Sánchez");
  expect(await portrait.textContent()).not.toBe(initial);
  expect(await portrait.textContent()).toBe(await page.locator(".ascii-avatar .sr-only").textContent());
});

test("Vim edits, moves, undoes, searches and persists files", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("combobox", { name: "Terminal command" }).fill("nvim ~/about.txt");
  await page.getByRole("combobox", { name: "Terminal command" }).press("Enter");
  const editor = page.getByRole("textbox", { name: "Edit ~/about.txt" });
  await expect(editor).toBeFocused();
  await page.keyboard.type("gg0iVim test ");
  await expect(page.locator(".editor-mode")).toHaveText("INSERT");
  await page.keyboard.press("Escape");
  await expect(page.locator(".editor-mode")).toHaveText("NORMAL");
  await expect(editor).toContainText("Vim test");
  await page.keyboard.type("u");
  await expect(editor).not.toContainText("Vim test");
  await page.keyboard.press("Control+r");
  await expect(editor).toContainText("Vim test");
  await page.keyboard.type("gg0lj");
  await expect(page.getByLabel("Cursor position")).toHaveText(/^2:/);
  await page.keyboard.type("gg0vll");
  await expect(page.locator(".editor-mode")).toHaveText("VISUAL");
  await page.keyboard.press("Escape");
  await page.keyboard.type("/Madrid");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await page.keyboard.type(":wq");
  await page.keyboard.press("Enter");
  const input = page.getByRole("combobox", { name: "Terminal command" });
  await expect(input).toBeFocused();
  await input.fill("cat about.txt");
  await input.press("Enter");
  await expect(page.locator(".terminal-content")).toContainText("Vim test");
  await page.reload();
  await input.fill("nvim about.txt");
  await input.press("Enter");
  await expect(editor).toContainText("Vim test");
});

test("mobile editor has usable controls and no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("combobox", { name: "Terminal command" }).fill("nvim ~/about.txt");
  await page.getByRole("combobox", { name: "Terminal command" }).press("Enter");
  await page.getByRole("button", { name: "i · edit" }).click();
  await expect(page.locator(".editor-mode")).toHaveText("INSERT");
  await page.keyboard.type("Mobile edit ");
  await page.getByRole("button", { name: "Esc · normal" }).click();
  await expect(page.locator(".editor-mode")).toHaveText("NORMAL");
  await page.getByRole("button", { name: "? keys", exact: true }).click();
  await expect(page.locator(".vim-help")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/vim-mobile.png" });
  await page.getByRole("button", { name: ":q! · discard & quit" }).click();
  await expect(page.getByRole("combobox", { name: "Terminal command" })).toBeVisible();
});

test("tmux windows preserve independent shells and open Vim buffers", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const activePanel = page.getByRole("tabpanel");
  const input = activePanel.getByRole("combobox", { name: "Terminal command" });
  await input.fill("cd projects");
  await input.press("Enter");
  await input.fill("unfinished command");
  await input.press("Control+b");
  await page.keyboard.press("c");
  await expect(page.getByRole("tab", { name: "1:zsh*", exact: true })).toBeVisible();
  await expect(input).toHaveValue("");
  await expect(activePanel.locator(".terminal-current-path")).toHaveText("~");
  await input.fill("nvim ~/about.txt");
  await input.press("Enter");
  await expect(activePanel.getByRole("textbox", { name: "Edit ~/about.txt" })).toBeFocused();
  await page.keyboard.type("iWindow two");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+b");
  await page.keyboard.press("p");
  await expect(input).toHaveValue("unfinished command");
  await expect(activePanel.locator(".terminal-current-path")).toHaveText("~/projects");
  await input.press("Control+b");
  await page.keyboard.press("1");
  await expect(activePanel.getByRole("textbox", { name: "Edit ~/about.txt" })).toContainText("Window two");
  await expect(activePanel.locator(".editor-mode")).toHaveText("NORMAL");
  await page.getByRole("button", { name: "Rename window", exact: true }).click();
  await page.getByLabel("Window name").fill("notes");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("tab", { name: "1:notes*", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close window", exact: true }).click();
  await expect(page.getByRole("tab")).toHaveCount(1);
  await expect(input).toHaveValue("unfinished command");
  await expect(page.getByRole("button", { name: "Close window", exact: true })).toBeDisabled();
});

test("tmux tabs stay within the mobile terminal width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (let i = 0; i < 5; i++) await page.getByRole("button", { name: "New window", exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const footer = await page.locator(".tmux-footer").boundingBox();
  const content = await page.getByRole("tabpanel").locator(".editor-footer").boundingBox();
  expect(footer?.width).toBe(content?.width);
  expect(footer?.x).toBe(content?.x);
  await page.screenshot({ path: "/tmp/tmux-mobile.png" });
});


test("repeating the intro command replays its animated output without clearing history", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/");
  await page.getByRole("button", { name: "skip intro" }).click();
  const input = page.getByRole("combobox", { name: "Terminal command" });
  for (let count = 1; count <= 2; count++) {
    await input.fill("cat avatar.txt about.txt");
    await input.press("Enter");
    const profiles = page.locator(".terminal-content .profile-output");
    await expect(profiles).toHaveCount(count);
    const name = profiles.last().locator("h1 > .reveal-text > [aria-hidden]");
    await expect(name).not.toHaveText("Alberto Sánchez");
    await page.clock.runFor(2000);
    await expect(name).toHaveText("Alberto Sánchez");
    await expect(input).toBeFocused();
  }
});

 test("Vim requires writes and supports normal and forced quits", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const input = page.getByRole("combobox", { name: "Terminal command" });
  const editor = page.getByRole("textbox", { name: "Edit ~/about.txt" });
  const ex = async (command: string) => {
    await page.keyboard.press("Escape");
    await page.keyboard.type(`:${command}`);
    await page.keyboard.press("Enter");
  };
  await input.fill("nvim about.txt");
  await input.press("Enter");
  await expect(editor).toBeFocused();
  await page.keyboard.type("iSaved text ");
  await ex("q");
  await expect(editor).toBeVisible();
  await expect(page.locator(".vim-workspace").getByRole("status")).toContainText("E37");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-vim:~/about.txt"))).toBeNull();
  await ex("w");
  await expect(editor).toBeVisible();
  await page.keyboard.type("iDiscard text ");
  await ex("q!");
  await expect(input).toBeFocused();
  await input.fill("nvim about.txt");
  await input.press("Enter");
  await expect(editor).toContainText("Saved text");
  await expect(editor).not.toContainText("Discard text");
  await ex("q");
  await expect(input).toBeFocused();
 });
