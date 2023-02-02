import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export function compose<T1, T2>(func: (t1: T1) => T2): (t1: T1) => T2;
export function compose<T1, T2, T3>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3
): (t1: T1) => T3;
export function compose<T1, T2, T3, T4>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t3: T3) => T4
): (t1: T1) => T4;
export function compose<T1, T2, T3, T4, T5>(
  func1: (t1: T1) => T2,
  func2: (t2: T2) => T3,
  func3: (t3: T3) => T4,
  func4: (t4: T4) => T5
): (t1: T1) => T5;
export function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input);
  };
}

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(addOne, addOne, String);

const stringifyThenAddOne = compose(
  // @ts-expect-error
  String,
  // addOne takes in a number - so it shouldn't be allowed after
  // a function that returns a string!
  addOne
);

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4);

  expect(result).toEqual("6");

  type tests = [Expect<Equal<typeof result, string>>];
});
