import type { FeatureFlags } from "./config/feature-flags.ts";
import { legacyUIRenderer, modernUIRenderer } from "./UiRenderer.tsx";

export const createFeatureAwareFactory = (featureFlags: FeatureFlags) => {
  return {
    // UI Renderer based on feature flag
    uiRenderer: () => {
      if (featureFlags.showNewUI) {
        return modernUIRenderer();
      }
      return legacyUIRenderer();
    },

    // Theme provider based on feature flag
    getTheme: () => {
      return featureFlags.enableDarkMode ? "dark" : "light";
    },
  };
};
