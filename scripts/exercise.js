const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const fg = require("fast-glob");

const srcPath = path.resolve(__dirname, "../src");

const [, , exercise] = process.argv;

if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fg.sync(
  path.join(srcPath, "**", "**.ts").replace(/\\/g, "/"),
);

let pathIndicator = ".problem.";

if (process.env.SOLUTION) {
  pathIndicator = ".solution.";
}

const exerciseFile = allExercises.find((e) => {
  const base = path.parse(e).base;
  return base.startsWith(exercise) && base.includes(pathIndicator);
});

if (!exerciseFile) {
  console.log(`Exercise ${exercise} not found`);
  process.exit(1);
}

// One-liner for current directory
chokidar.watch(exerciseFile).on("all", (event, path) => {
  const fileContents = fs.readFileSync(exerciseFile, "utf8");

  const containsVitest =
    fileContents.includes(`from "vitest"`) ||
    fileContents.includes(`from 'vitest'`);
  try {
    console.clear();
    if (containsVitest) {
      console.log("Running tests...");
      execSync(`vitest run "${exerciseFile}" --passWithNoTests`, {
        stdio: "inherit",
      });
    }
    console.log("Checking types...");
    execSync(`tsc "${exerciseFile}" --noEmit --strict`, {
      stdio: "inherit",
    });
    console.log("Typecheck complete. You finished the exercise!");
  } catch (e) {
    console.log("Failed. Try again!");
  }
});
