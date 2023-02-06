const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

/**
 * Adds a bunch of scripts, like e-01, e-02 to package.json
 * so that StackBlitz can run them programmatically via URL
 * commands
 */

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const srcPath = path.resolve(__dirname, "../src");
const allExercises = fg.sync(
  path.join(srcPath, "**", "**.ts").replace(/\\/g, "/"),
);
const exerciseFiles = allExercises.filter((exercise) =>
  exercise.includes(".problem."),
);
const exerciseNames = exerciseFiles.map(
  (exercise) => path.parse(exercise).base.split("-")[0],
);

const newPackageJson = Object.assign({}, packageJson);

newPackageJson.scripts = {
  ...packageJson.scripts,
};

exerciseNames.forEach((exercise) => {
  newPackageJson.scripts[`e-${exercise}`] = `npm run exercise -- ${exercise}`;
  newPackageJson.scripts[`s-${exercise}`] = `npm run solution -- ${exercise}`;
});

fs.writeFileSync(packageJsonPath, JSON.stringify(newPackageJson, null, 2));
