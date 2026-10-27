import { expect, test } from "@playwright/test";

test("the production home route loads the terminal", async ({ page }) => {
  const runtimeErrors: Error[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error));

  await page.goto("/");

  await expect(
    page.getByRole("combobox", { name: "Terminal command" }),
  ).toBeVisible();
  await expect(page.getByRole("tablist", { name: "tmux windows" })).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});

for (const path of ["/projects", "/posts/welcome-to-my-blog", "/missing"]) {
  test(`the Pages fallback boots the app for ${path}`, async ({ page }) => {
    const runtimeErrors: Error[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error));

    await page.goto(path);

    await expect(page.locator(".not-found")).toContainText("404 / page not found");
    await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(runtimeErrors).toEqual([]);
  });
}
