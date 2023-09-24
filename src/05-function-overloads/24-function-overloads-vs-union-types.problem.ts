import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function runGenerator<T>(generator: () => T): T
function runGenerator<T>(generator: { run: () => T }): T
function runGenerator<T>(generator: (() => T) | { run: () => T }): T {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  });

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello");

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});
