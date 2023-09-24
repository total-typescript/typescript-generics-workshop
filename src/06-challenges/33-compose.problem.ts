import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export function compose<T1, T2>(func0: (arg: T1) => T2): (input: T1) => T2

export function compose<T1, T2, T3>(
  func0: (arg: T1) => T2,
  func1: (arg: T2) => T3
): (input: T1) => T3

export function compose<T1, T2, T3, T4>(
  func0: (arg: T1) => T2,
  func1: (arg: T2) => T3,
  func2: (arg: T3) => T4
): (input: T1) => T4

export function compose(
  ...funcs: Array<(input: any) => any>
) {
  return (input: any) =>
    funcs.reduce(
      (acc, fn) => fn(acc),
      input
    );
}

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(addOne, addOne, String);

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4);

  expect(result).toEqual("6");

  type tests = [Expect<Equal<typeof result, string>>];
});

it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne,
  );
});
