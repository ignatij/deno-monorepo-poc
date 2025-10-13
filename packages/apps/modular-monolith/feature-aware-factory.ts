import type { FeatureFlags } from "./config/feature-flags.ts";
import { createOperationHandler, multiply } from "./operation-handler.ts";

const identity = (x: number) => x;

export const createFeatureAwareFactory = (featureFlags: FeatureFlags) => {
  return {
    operationHandler: () => {
      if (featureFlags.includeMultiply) {
        return createOperationHandler(multiply);
      } else {
        return createOperationHandler(identity);
      }
    },
  };
};
