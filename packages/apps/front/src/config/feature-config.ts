import type { FeatureFlags } from "./feature-flags.ts";

export class FeatureConfig {
  private static instance: FeatureConfig | null = null;
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
    console.log("Loading frontend feature config from environment");

    // Load from Vite environment variables
    return {
      showNewUI: import.meta.env.VITE_FEATURE_NEW_UI === "true",
      enableDarkMode: import.meta.env.VITE_FEATURE_DARK_MODE === "true",
    };
  }

  private logConfig(): void {
    console.log("🎯 Frontend Feature Configuration Loaded:");
    console.log(`  - Show New UI: ${this.config.showNewUI}`);
    console.log(`  - Enable Dark Mode: ${this.config.enableDarkMode}`);
  }

  getFeatureFlags(): FeatureFlags {
    return { ...this.config };
  }
}

export const featureConfig = FeatureConfig.getInstance();
