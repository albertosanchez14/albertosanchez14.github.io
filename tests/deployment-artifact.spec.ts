import { readFile } from "node:fs/promises";

import { expect, test } from "@playwright/test";

const artifactFile = (name: string) =>
  new URL(`../dist/${name}`, import.meta.url);

test("the Pages artifact includes the custom domain", async () => {
  await expect(readFile(artifactFile("CNAME"), "utf8")).resolves.toBe(
    "asanch.me\n",
  );
});

test("the Pages fallback boots the same SPA as the index", async () => {
  const [index, fallback] = await Promise.all([
    readFile(artifactFile("index.html"), "utf8"),
    readFile(artifactFile("404.html"), "utf8"),
  ]);

  expect(fallback).toBe(index);
});
