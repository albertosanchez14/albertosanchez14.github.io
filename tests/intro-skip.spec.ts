import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`the completed intro accepts typing without a click at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const start = new Date("2026-10-27T12:00:00Z");
    await page.clock.install({ time: start });
    await page.clock.pauseAt(start);
    await page.goto("/");
    await page.clock.runFor(5000);

    const shell = page.getByRole("combobox", { name: "Terminal command" });
    await expect(shell).toBeFocused({ timeout: 1000 });
    await expect(shell).toBeInViewport();
    await page.keyboard.type("pwd");
    await expect(shell).toHaveValue("pwd");
    await page.keyboard.press("Enter");
    await expect(page.locator(".terminal-content")).toContainText("pwd");
  });
}

for (const elapsed of [0, 2000]) {
  test(`Enter skips the intro after ${elapsed}ms and focuses the shell`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const start = new Date("2026-10-27T12:00:00Z");
    await page.clock.install({ time: start });
    await page.clock.pauseAt(start);
    await page.goto("/");
    await page.clock.runFor(elapsed);
    await page.keyboard.press("Enter");

    const shell = page.getByRole("combobox", { name: "Terminal command" });
    await expect(shell).toBeVisible({ timeout: 1000 });
    await expect(shell).toBeFocused();
    await expect(page.locator(".intro-listing")).toContainText("projects/");
    await expect(page.locator(".terminal-content")).toBeEmpty();
    const portrait = page.locator(".ascii-avatar");
    await expect(portrait.locator('[aria-hidden="true"]')).toHaveText(await portrait.locator(".sr-only").innerText());

    await shell.fill("pwd");
    await shell.press("Enter");
    await expect(page.locator(".terminal-content")).toContainText("pwd");
  });
}
