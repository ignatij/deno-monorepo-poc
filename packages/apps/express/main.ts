import express, { Request, Response } from "express";
import { add } from "@deno-monorepo-poc/domain";

const app = express();

app.get("/", (_: Request, res: Response) => {
  const result = add(2, 3);
  res.send(`Welcome to the Dinosaur API! The result is ${result}`);
});

app.listen(8000);
console.log(`Server is running on http://localhost:8000`);
