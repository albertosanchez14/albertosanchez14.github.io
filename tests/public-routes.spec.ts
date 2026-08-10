import { expect, test, type Page } from "@playwright/test";

import { listPosts, listProjects } from "../src/content/portfolio";

const indexRoutes = [
  { path: "/", heading: "Alberto Sánchez del Álamo" },
  { path: "/projects", heading: "Projects" },
  { path: "/posts", heading: "Posts" },
  { path: "/about", heading: "Alberto Sánchez del Álamo" },
] as const;

const detailRoutes = [
  ...listProjects().map((project) => ({
    path: `/projects/${project.slug}`,
    heading: project.title,
  })),
  ...listPosts().map((post) => ({
    path: `/posts/${post.slug}`,
    heading: post.title,
  })),
];

const unknownRoutes = [
  { path: "/missing", heading: "Page not found" },
  { path: "/projects/missing", heading: "Project not found" },
  { path: "/posts/missing", heading: "Post not found" },
] as const;

async function expectRoute(page: Page, path: string, heading: string) {
  const runtimeErrors: Error[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error));

  await page.goto(path);
  await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  await expect(page.locator("a a, a button, button a")).toHaveCount(0);
  expect(runtimeErrors).toEqual([]);
}

for (const route of [...indexRoutes, ...detailRoutes]) {
  test(`direct visit renders ${route.path}`, async ({ page }) => {
    await expectRoute(page, route.path, route.heading);
  });
}

for (const route of unknownRoutes) {
  test(`direct visit renders the not-found experience for ${route.path}`, async ({ page }) => {
    await expectRoute(page, route.path, route.heading);
  });
}

test("main navigation changes index routes without a document reload", async ({ page }) => {
  await page.goto("/");

  for (const route of indexRoutes.slice(1)) {
    const linkName = route.path === "/about" ? "About" : route.heading;
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: linkName })
      .click();
    await expect(page).toHaveURL(new RegExp(`${route.path}/?$`));
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
  }
});
