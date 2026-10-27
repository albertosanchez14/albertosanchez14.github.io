import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`Vim numbers and active highlight align with text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const shell = page.getByRole("combobox", { name: "Terminal command" });
    await shell.fill("nvim about.txt");
    await shell.press("Enter");
    await expect(page.getByRole("textbox", { name: "Edit ~/about.txt" })).toBeFocused();
    for (const motion of ["gg", "j", "G"]) {
      await page.keyboard.type(motion);
      await expect.poll(async () => {
        const line = await page.locator(".cm-activeLine").boundingBox();
        const number = await page.locator(".cm-lineNumbers .cm-activeLineGutter").boundingBox();
        return line && number ? Math.abs(line.y - number.y) : Infinity;
      }).toBeLessThan(1);
      const position = await page.getByLabel("Cursor position").innerText();
      await expect(page.locator(".cm-lineNumbers .cm-activeLineGutter")).toHaveText(position.split(":")[0]);
    }
  });
}
