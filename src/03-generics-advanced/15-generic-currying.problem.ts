import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const createTransformable = (item: unknown) => {
  return {
    item,
    transform: (transformer: (item: unknown) => unknown) => {},
  };
};

it("Should allow for transforming the initial value passed in", () => {
  const result = createTransformable("hello").transform((item) =>
    item.toUpperCase(),
  );

  expect(result.item).toEqual("HELLO");

  type test1 = Expect<Equal<typeof result.item, string>>;
});

it("Should also transform the type", () => {
  const numberResult = createTransformable(12);

  expect(numberResult.item).toEqual(12);

  const stringResult = numberResult.transform((item) => item.toString());

  expect(stringResult.item).toEqual("12");

  type tests = [
    Expect<Equal<typeof numberResult.item, number>>,
    Expect<Equal<typeof stringResult.item, string>>,
  ];
});
