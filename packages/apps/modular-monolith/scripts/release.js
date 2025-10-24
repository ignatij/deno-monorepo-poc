#!/usr/bin/env node
import semanticRelease from "semantic-release";

const result = await semanticRelease({
  ci: true,
  config: "./packages/apps/modular-monolith/.releaserc.json",
});

if (!result) {
  console.error("No release triggered");
}
