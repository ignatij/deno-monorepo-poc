import express, { type Request, type Response } from "express";
import { createFeatureAwareFactory } from "./feature-aware-factory.ts";
import { featureConfig } from "./config/feature-config.ts";

const app = express();

// Initialize with feature decisions from config
const factory = createFeatureAwareFactory(featureConfig.getFeatureFlags());

app.get("/", (_: Request, res: Response) => {
  const result = factory.operationHandler().add(5, 3);
  res.send(`Welcome to this very useful API: the result is ${result}`);
});

app.get("/health", (_: Request, res: Response) => {
  res.json({
    status: "healthy",
    features: featureConfig.getFeatureFlags(),
  });
});

app.listen(8000);

console.log(`Server is running on http://localhost:8000`);
