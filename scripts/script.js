const { execSync } = require("child_process");

const result = execSync("ls -R src").toString();

console.log(
  result
    .trim()
    .split("\n")
    .filter(Boolean)
    .filter((line) => line.endsWith(".ts") || line.endsWith(":"))
    .join("\n"),
);
