import type { FeatureFlags } from "./feature-flags.ts";

/**
 * Feature configuration loaded from environment variables
 *
 * Environment variables:
 * - FEATURE_MULTIPLY: Enable multiply operation (default: false)
 */

export class FeatureConfig {
  private static instance: FeatureConfig | null = null;
  private config: FeatureFlags | null = null;

  private constructor() {}

  static async initialize(): Promise<FeatureConfig> {
    if (!FeatureConfig.instance) {
      FeatureConfig.instance = new FeatureConfig();
      await FeatureConfig.instance.load();
    }
    return FeatureConfig.instance;
  }

  static getInstance(): FeatureConfig {
    if (!FeatureConfig.instance) {
      throw new Error(
        "FeatureConfig not initialized. Call FeatureConfig.initialize() first.",
      );
    }
    return FeatureConfig.instance;
  }

  private async load(): Promise<void> {
    console.log("Loading feature config from environment");

    try {
      this.config = await Promise.resolve({
        includeMultiply: Deno.env.get("FEATURE_MULTIPLY") === "true",
      });

      this.logConfig();
    } catch (error) {
      console.error("Failed to load feature config, using defaults:", error);
      this.config = {
        includeMultiply: false,
      };
    }
  }

  private logConfig(): void {
    console.log("🎯 Feature Configuration Loaded:");
    console.log(`  - Include Multiply: ${this.config!.includeMultiply}`);
  }

  getFeatureFlags(): FeatureFlags {
    if (!this.config) {
      throw new Error("FeatureConfig not initialized");
    }
    return this.config;
  }

  static resetInstance(): void {
    FeatureConfig.instance = null;
  }
}

export const featureConfig = FeatureConfig.getInstance;
