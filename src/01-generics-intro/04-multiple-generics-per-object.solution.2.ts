import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface Params<T1, T2> {
  a: T1;
  b: T2;
}

const returnBothOfWhatIPassIn = <T1, T2>(params: Params<T1, T2>) => {
  return {
    first: params.a,
    second: params.b,
  };
};

it("Should return an object where a -> first and b -> second", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual({
    first: "a",
    second: 1,
  });

  type test1 = Expect<
    Equal<
      typeof result,
      {
        first: string;
        second: number;
      }
    >
  >;
});
