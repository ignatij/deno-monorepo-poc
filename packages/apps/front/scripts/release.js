#!/usr/bin/env node
import { execSync } from "child_process";
import semanticRelease from "semantic-release";

const packagePath = ".";

// get last front tag
let lastTag = "";
try {
  lastTag = execSync('git describe --tags --match "front-v*" --abbrev=0')
    .toString()
    .trim();
} catch {
  console.log("No previous front tag found, releasing from start");
}

// check if any files changed in front package since last tag
const diffCmd = lastTag
  ? `git diff --name-only ${lastTag} HEAD ${packagePath}`
  : `git diff --name-only HEAD ${packagePath}`;
const diff = execSync(diffCmd).toString().trim();

if (!diff) {
  console.log("No changes in front, skipping release.");
  process.exit(0);
}

// run semantic-release
const result = await semanticRelease({
  ci: true,
  config: `${packagePath}/.releaserc.json`,
});

if (!result) {
  console.log("No release triggered by semantic-release.");
  process.exit(0);
} else {
  console.log(`Released front version ${result.nextRelease.version}`);
}
