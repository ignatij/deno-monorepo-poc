import { assertEquals } from "@std/assert";
import { createFeatureAwareFactory } from "./feature-aware-factory.ts";

Deno.test("operation handler with multiply feature disabled", () => {
  // Arrange
  const factory = createFeatureAwareFactory({ includeMultiply: false });
  const handler = factory.operationHandler();

  // Act
  const result = handler.add(5, 3);

  // Assert
  assertEquals(
    result,
    8,
    "Should return sum without multiplication (5 + 3 = 8)"
  );
});

Deno.test("operation handler with multiply feature enabled", () => {
  // Arrange
  const factory = createFeatureAwareFactory({ includeMultiply: true });
  const handler = factory.operationHandler();

  // Act
  const result = handler.add(5, 3);

  // Assert
  assertEquals(
    result,
    16,
    "Should return sum multiplied by 2 ((5 + 3) * 2 = 16)"
  );
});
