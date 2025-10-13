import type { FeatureFlags } from "./feature-flags.ts";

/**
 * Feature configuration loaded from environment variables
 *
 * Environment variables:
 * - FEATURE_MULTIPLY: Enable multiply operation (default: false)
 */
export class FeatureConfig {
  private static instance: FeatureConfig | null;
  private config: FeatureFlags;

  private constructor() {
    this.config = this.loadFromEnv();
    this.logConfig();
  }

  static getInstance(): FeatureConfig {
    if (!FeatureConfig.instance) {
      FeatureConfig.instance = new FeatureConfig();
    }
    return FeatureConfig.instance;
  }

  private loadFromEnv(): FeatureFlags {
    console.log("Loading feature config from environment");

    return {
      includeMultiply: Deno.env.get("FEATURE_MULTIPLY") === "true",
    };
  }

  private logConfig(): void {
    console.log("🎯 Feature Configuration Loaded:");
    console.log(`  - Include Multiply: ${this.config.includeMultiply}`);
  }

  getFeatureFlags(): FeatureFlags {
    return {
      includeMultiply: this.config.includeMultiply,
    };
  }
}

// Export singleton instance
export const featureConfig = FeatureConfig.getInstance();
