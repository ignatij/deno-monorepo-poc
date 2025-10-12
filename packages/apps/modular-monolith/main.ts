import { add } from "@deno-monorepo-poc/domain";
import express, { Request, Response } from "express";

const app = express();

app.get("/", (_: Request, res: Response) => {
  const result = add(5, 5);
  res.send(`Welcome to this very useful API: the result is ${result}`);
});

app.listen(8000);

console.log(`Server is running on http://localhost:8000`);
