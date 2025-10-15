import type { FeatureFlags } from "./feature-flags.ts";

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
        "FeatureConfig not initialized. Call FeatureConfig.initialize() first."
      );
    }
    return FeatureConfig.instance;
  }

  private async load(): Promise<void> {
    console.log("Loading frontend feature config from environment");

    try {
      this.config = await Promise.resolve({
        showNewUI: import.meta.env.VITE_FEATURE_NEW_UI === "true",
        enableDarkMode: import.meta.env.VITE_FEATURE_DARK_MODE === "true",
      });

      this.logConfig();
    } catch (error) {
      console.error("Failed to load feature config, using defaults:", error);
      this.config = await Promise.resolve({
        showNewUI: false,
        enableDarkMode: false,
      });
    }
  }

  private logConfig(): void {
    console.log("🎯 Frontend Feature Configuration Loaded:");
    console.log(`  - Show New UI: ${this.config!.showNewUI}`);
    console.log(`  - Enable Dark Mode: ${this.config!.enableDarkMode}`);
  }

  getFeatureFlags(): FeatureFlags {
    if (!this.config) {
      throw new Error("FeatureConfig not initialized");
    }
    return { ...this.config };
  }

  static resetInstance(): void {
    FeatureConfig.instance = null;
  }
}
