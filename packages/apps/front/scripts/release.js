#!/usr/bin/env node
import { execSync } from "child_process";
import semanticRelease from "semantic-release";

const packagePath = "."; // or relative path from repo root if needed
const packageTagPrefix = "front-v";

// 1. Get last tag for this package
let lastTag = "";
try {
  lastTag = execSync(
    `git describe --tags --match "${packageTagPrefix}*" --abbrev=0`,
  )
    .toString()
    .trim();
} catch {
  console.log(
    `No previous ${packageTagPrefix} tag found, releasing from start`,
  );
}

// 2. Collect commits affecting only this package (since last tag)
let commits = "";
try {
  commits = execSync(
    lastTag
      ? `git log ${lastTag}..HEAD --pretty=format:%H -- ${packagePath}`
      : `git log HEAD --pretty=format:%H -- ${packagePath}`,
  )
    .toString()
    .trim();
} catch {
  console.log("No commits found in this package.");
}

if (!commits) {
  console.log("No commits in front package since last release, skipping.");
  process.exit(0);
}

// 3. Run semantic-release limited to those commits only
process.env.GIT_COMMIT_FILTER = commits.split("\n").join(" ");

const result = await semanticRelease({
  ci: true,
  config: `${packagePath}/.releaserc.json`,
  // 👇 Force semantic-release to only consider filtered commits
  // (we'll monkey-patch its `analyzeCommits` plugin input)
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { scope: "front", type: "feat", release: "minor" },
          { scope: "front", type: "fix", release: "patch" },
          { scope: "front", type: "perf", release: "patch" },
          { scope: "front", breaking: true, release: "major" },
        ],
        parserOpts: { noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"] },
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
});

if (!result) {
  console.log("No release triggered by semantic-release.");
  process.exit(0);
} else {
  console.log(`Released front version ${result.nextRelease.version}`);
}
