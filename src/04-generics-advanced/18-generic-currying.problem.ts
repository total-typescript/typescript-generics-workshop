import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const curryFunction =
  <T, U, V>(t: T) =>
  (u: U) =>
  (v: V) => {
    return {
      t,
      u,
      v,
    };
  };

it("Should return an object which matches the types of each input", () => {
  const result = curryFunction(1)(2)(3);

  expect(result).toEqual({
    t: 1,
    u: 2,
    v: 3,
  });

  type test = [
    Expect<Equal<typeof result, { t: number; u: number; v: number }>>,
  ];
});
