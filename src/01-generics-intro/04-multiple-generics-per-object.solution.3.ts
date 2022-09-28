import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type Params<T1, T2> = {
  a: T1;
  b: T2;
};

const returnBothOfWhatIPassIn = <T1, T2>(params: Params<T1, T2>): [T1, T2] => {
  return [params.a, params.b];
};

it("Should return a tuple of the properties a and b", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual(["a", 1]);

  type test1 = Expect<Equal<typeof result, [string, number]>>;
});
