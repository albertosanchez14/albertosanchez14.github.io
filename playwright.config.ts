import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node tests/serve-pages.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
