#!/usr/bin/env node
import { execSync } from "child_process";
import semanticRelease from "semantic-release";

const packagePath = "packages/apps/modular-monolith";

// get last tag
let lastTag = "";
try {
  lastTag = execSync(
    'git describe --tags --match "modular-monolith-v*" --abbrev=0'
  )
    .toString()
    .trim();
} catch {
  console.log("No previous modular-monolith tag found, releasing from start");
}

// check if any files changed in modular monolith package since last tag
const diff = execSync(
  `git diff --name-only ${lastTag || ""} HEAD ${packagePath}`
)
  .toString()
  .trim();

if (!diff) {
  console.log("No changes in modular-monolith, skipping release.");
  process.exit(0);
}

// run semantic-release
const result = await semanticRelease({
  ci: true,
  config: `${packagePath}/release.config.json`,
});

if (!result) {
  console.log("No release triggered by semantic-release.");
  process.exit(0);
} else {
  console.log(
    `Released modular-monolith version ${result.nextRelease.version}`
  );
}
