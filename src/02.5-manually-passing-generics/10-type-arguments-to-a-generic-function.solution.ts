import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const getDataFromLocalStorage = <TItem>(key: string): TItem => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  throw new Error("No data found");
};

it("Should get saved data from localStorage", () => {
  localStorage.setItem("myData", JSON.stringify({ a: 1, b: 2, c: 3 }));

  /**
   * Can you make the types happy while only
   * changing the line below?
   */
  const data = getDataFromLocalStorage<{ a: number; b: number; c: number }>(
    "myData",
  );

  expect(data).toEqual({ a: 1, b: 2, c: 3 });

  type tests = [
    Expect<Equal<typeof data, { a: number; b: number; c: number }>>,
  ];
});
