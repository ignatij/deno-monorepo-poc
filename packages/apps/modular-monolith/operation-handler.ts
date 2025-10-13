import type { AdditionalOpEnhancer } from "./types.ts";

export const multiply = (x: number) => x * 2;

export const createOperationHandler = (
  additionalOpEnhancer: AdditionalOpEnhancer,
) => {
  return {
    add: (a: number, b: number) => {
      const base = a + b;
      return additionalOpEnhancer(base);
    },
  };
};
