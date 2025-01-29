import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type middleFuncArray<TInput, TReturn> = Array<(input: TInput) => TReturn>;

type FuncArray<TInputFirst, TReturn, TReturnLast> = [
  (input: TInputFirst) => TReturn,
  ...middleFuncArray<TReturn, TReturn>,
  (input: TReturn) => TReturnLast
];

export const compose =
  <TInputFirst, TReturn, TReturnLast>(
    ...funcs: FuncArray<TInputFirst, TReturn, TReturnLast>
  ) =>
  (input: TInputFirst) => {
    return funcs.reduce<any>((acc, fn) => fn(acc), input) as TReturnLast;
  };

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(
  addOne,
  addOne,
  addOne,
  addOne,
  addOne,
  addOne,
  addOne,
  addOne,
  String
);

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
    addOne
  );
});
