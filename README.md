# deno-monorepo-poc

## Adding a new package

1. Create the directory: `packages/shared/<name>`

2. If `<name>` is not under `packages/apps` or `packages/shared`, update `deno.json`'s `workspace` attribute (currently: `"workspace": ["./packages/shared/*", "./packages/apps/*"],`)

3. `cd packages/shared/<name>` && `deno init`

4. Complete `deno.json` with the following:

```
  "name": "@deno-monorepo-poc/<name>",
  "version": "0.1.0",
  "exports": "./lib.ts",
```

## Working within a specific package

e.g.:

```
cd packages/shared/domain
deno task dev
```

## Importing a package within another

e.g. `packages/shared/domain/deno.json`:

```
{
  "name": "@deno-monorepo-poc/domain",
  "version": "0.1.0",
  "exports": "./lib.ts",
}
```

Import it from `packages/apps/modular-monolith/main.ts`:

```
import { add } from "@deno-monorepo-poc/domain";
```

## Building a React application

`build` doesn't make sense for most packages (libraries, Express application etc.), since TypeScript is native in Deno. However, it does for React applications:

Requires [`deno-vite-plugin`](https://github.com/denoland/deno-vite-plugin)

```typescript
// packages/apps/front/vite.config.ts
import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), deno()],
});
```

and

```json
// packages/apps/front/tsconfig.app.json
{
  "compilerOptions": {
    // ...
    "paths": {
      "@deno-monorepo-poc/domain": ["../../shared/domain/lib.ts"]
    }
  },
  "include": ["src"]
}
```

```
cd packages/apps/front
deno task build
```

## Containerization

```
docker build -f Dockerfile.modular-monolith -t modular-monolith:latest .
docker build -f Dockerfile.front -t front:latest .
```

## Official documentation

- https://docs.deno.com/runtime/fundamentals/workspaces/
- https://docs.deno.com/runtime/reference/docker/#working-with-workspaces-in-docker
- https://docs.deno.com/runtime/reference/bundling/
