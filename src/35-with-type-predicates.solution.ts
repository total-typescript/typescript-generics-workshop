import { expect, it } from "vitest";

const isNumber = (t: unknown): t is number => {
  return typeof t === "number";
};

const isString = (t: unknown): t is string => {
  return typeof t === "string";
};

interface TransformerConfig<TInput, TOutput> {
  checker: (t: unknown) => t is TInput;
  transformer: (t: TInput) => TOutput;
}

export const makeTransformer = <TInput, TOutput>(
  config: TransformerConfig<TInput, TOutput>,
) => {
  return (t: unknown): TOutput => {
    if (config.checker(t)) {
      return config.transformer(t);
    } else {
      throw new Error(`Unknown input!`);
    }
  };
};

it("Should fail if given the wrong type", () => {
  const numberTransformer = makeTransformer({
    checker: isNumber,
    transformer: (t) => t.toString(),
  });
  expect(() => numberTransformer("abc")).toThrow();
});

it("Should transform the type", () => {
  const stringTransformer = makeTransformer({
    checker: isString,
    transformer: (t) => t.toUpperCase(),
  });
  expect(stringTransformer("abc")).toEqual("ABC");
});
