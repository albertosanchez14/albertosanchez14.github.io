import { expect, test } from "@playwright/test";

test("cat avatar matches the startup portrait size and heading color", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const shell = page.getByRole("combobox", { name: "Terminal command" });
  await shell.fill("cat avatar.txt");
  await shell.press("Enter");
  const portraits = page.getByRole("img", { name: "ASCII portrait of Alberto Sánchez", exact: true });
  await expect(portraits).toHaveCount(2);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const headingColor = await page.locator(".profile-info h1").evaluate(el => getComputedStyle(el).color);
    const metrics = await portraits.evaluateAll(elements => elements.map(el => {
      const range = document.createRange();
      range.selectNodeContents(el.querySelector('[aria-hidden="true"]') ?? el);
      const bounds = range.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height, color: getComputedStyle(el).color };
    }));
    expect(metrics[1].width).toBeCloseTo(metrics[0].width, 0);
    expect(metrics[1].height).toBeCloseTo(metrics[0].height, 0);
    for (const metric of metrics) expect(metric.color).toBe(headingColor);
  }
});
