#!/usr/bin/env node
import { execSync } from "child_process";
import semanticRelease from "semantic-release";

const packageName = "front";
const packagePath = ".";

// find last tag for this package
let lastTag = "";
try {
  lastTag = execSync(
    `git describe --tags --match "${packageName}-v*" --abbrev=0`,
  )
    .toString()
    .trim();
} catch {
  console.log(`No previous ${packageName} tag found, releasing from start.`);
}

// get commits that touched this package
const commits = execSync(
  `git log ${lastTag ? `${lastTag}..HEAD` : ""} --pretty=format:%H -- ${packagePath}`,
)
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean);

if (commits.length === 0) {
  console.log(`No commits affecting ${packageName}, skipping release.`);
  process.exit(0);
}

// run semantic-release using only these commits
const env = { ...process.env };
env.SEMANTIC_RELEASE_COMMITS = commits.join(",");

const result = await semanticRelease(
  {
    ci: true,
    config: `${packagePath}/release.config.json`,
  },
  { env },
);

if (!result) {
  console.log("No release triggered by semantic-release.");
  process.exit(0);
} else {
  console.log(`Released ${packageName} version ${result.nextRelease.version}`);
}
