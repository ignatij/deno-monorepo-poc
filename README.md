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

```
cd packages/shared/domain
deno task dev
```

```
cd packages/apps/modular-monolith
deno task dev
```

but

```
cd packages/apps/front
npm run dev
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

## Running commands across workspaces

### Native scripts

```
deno test
```

```
deno lint
```

### Non-native scripts, e.g. build

`build` doesn't make sense for most packages (libraries, Express application etc.), since TypeScript is native. However, `build` makes sense for React applications:

```
cd packages/apps/front
deno task build
```

## Containerization

### modular-monolith

Example of Full Workspace Containerization (unoptimized) with `packages/apps/modular-monolith` (uses `packages/shared/domain`):

Dockerfile:

```
FROM denoland/deno:alpine AS builder
WORKDIR /app
COPY deno.json .
COPY packages/apps/modular-monolith/ ./packages/apps/modular-monolith/
COPY packages/shared/domain/ ./packages/shared/domain/
COPY packages/shared/utils/ ./packages/shared/utils/
WORKDIR /app/packages/apps/modular-monolith
RUN deno cache main.ts

FROM denoland/deno:alpine
WORKDIR /app
COPY --from=builder /app .
WORKDIR /app/packages/apps/modular-monolith
EXPOSE 8000
CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
```

From workspace root:

```
docker build -f Dockerfile.modular-monolith -t modular-monolith:latest .
```

### front

```

```

```
docker build -f Dockerfile.front -t front:latest .
docker run front:latest -p 8080:80
```

## Official documentation

- https://docs.deno.com/runtime/fundamentals/workspaces/
- https://docs.deno.com/runtime/reference/docker/#working-with-workspaces-in-docker
- https://docs.deno.com/runtime/reference/bundling/
