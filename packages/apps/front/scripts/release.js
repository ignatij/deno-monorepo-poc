#!/usr/bin/env node
import { execSync } from "child_process";
import semanticRelease from "semantic-release";
import conventionalCommits from "conventional-changelog-conventionalcommits"; // important
import commitAnalyzer from "@semantic-release/commit-analyzer";
import releaseNotesGenerator from "@semantic-release/release-notes-generator";
import changelog from "@semantic-release/changelog";
import npmPlugin from "@semantic-release/npm";
import gitPlugin from "@semantic-release/git";

const packageName = "front";
const packagePath = ".";
const tagPrefix = `${packageName}-v`;

// --- Step 1: Find the last tag for this package
let lastTag = "";
try {
  lastTag = execSync(`git describe --tags --match "${tagPrefix}*" --abbrev=0`)
    .toString()
    .trim();
} catch {
  console.log(`No previous ${tagPrefix} tag found, releasing from start.`);
}

// --- Step 2: Check for commits affecting this package
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
  console.log(`No commits in ${packageName} since last release, skipping.`);
  process.exit(0);
}

// --- Step 3: Run semantic-release programmatically
const result = await semanticRelease({
  ci: true,
  branches: ["main"],
  tagFormat: `${tagPrefix}${"${version}"}`,
  plugins: [
    [
      commitAnalyzer,
      {
        preset: "conventionalcommits",
        releaseRules: [
          { scope: packageName, type: "feat", release: "minor" },
          { scope: packageName, type: "fix", release: "patch" },
          { scope: packageName, type: "perf", release: "patch" },
          { scope: packageName, breaking: true, release: "major" },
        ],
        parserOpts: { noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"] },
      },
    ],
    [
      releaseNotesGenerator,
      {
        preset: "conventionalcommits",
        config: conventionalCommits,
      },
    ],
    [changelog, { changelogFile: "CHANGELOG.md" }],
    [npmPlugin, { npmPublish: false }],
    [
      gitPlugin,
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\\n\\n${nextRelease.notes}",
      },
    ],
  ],
});

if (!result) {
  console.log("No release triggered by semantic-release.");
  process.exit(0);
} else {
  console.log(`Released ${packageName} version ${result.nextRelease.version}`);
}
