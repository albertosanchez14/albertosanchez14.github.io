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

test("in-app links navigate every public route without a document reload", async ({ page }) => {
  let documentRequests = 0;
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      documentRequests += 1;
    }
  });

  await page.goto("/");
  expect(documentRequests).toBe(1);

  for (const route of indexRoutes.slice(1)) {
    const linkName = route.path === "/about" ? "About" : route.heading;
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: linkName })
      .click();
    await expect(page).toHaveURL(new RegExp(`${route.path}/?$`));
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    expect(documentRequests).toBe(1);
  }

  for (const project of listProjects()) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects" })
      .click();
    await page.getByRole("link", { name: `View ${project.title}`, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
    expect(documentRequests).toBe(1);
  }

  for (const post of listPosts()) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Posts" })
      .click();
    await page.getByRole("link", { name: post.title }).click();
    await expect(page.getByRole("heading", { level: 1, name: post.title })).toBeVisible();
    expect(documentRequests).toBe(1);
  }
});
