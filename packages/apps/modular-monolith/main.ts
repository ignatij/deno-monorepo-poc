import express, { type Request, type Response } from "express";
import { FeatureConfig } from "./config/feature-config.ts";
import { createFeatureAwareFactory } from "./feature-aware-factory.ts";

const app = express();

await FeatureConfig.initialize();
const config = FeatureConfig.getInstance().getFeatureFlags();

// Initialize with feature decisions from config
const factory = createFeatureAwareFactory(config);

app.get("/", (_: Request, res: Response) => {
  const result = factory.operationHandler().add(2, 3);
  res.send(`Welcome to this very useful API: the result is ${result}`);
});

app.get("/health", (_: Request, res: Response) => {
  res.json({
    status: "healthy",
    features: config,
  });
});

app.listen(8000);

console.log(`Server is running on http://localhost:8000`);
