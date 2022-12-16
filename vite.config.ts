import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.ts"],
    setupFiles: ["scripts/setup.ts"],
    passWithNoTests: true,
  },
});
