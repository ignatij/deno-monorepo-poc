# deno-monorepo-poc

## Working within a specific package

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

Import it from `packages/apps/express/main.ts`:

```
import { add } from "@deno-monorepo-poc/domain";
```

## Running commands across workspaces

### Native scripts

```
deno test
```

### Launching many assets in parallel in watch mode

```
deno task --cwd=packages/apps/express dev
```

and (in a separate terminal):

```
deno task --cwd=packages/apps/react dev
```

## Official documentation

- https://docs.deno.com/runtime/fundamentals/workspaces/
