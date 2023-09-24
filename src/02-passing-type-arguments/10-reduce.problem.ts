import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const array = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

const obj = array.reduce((accum: Record<string, typeof array[number]>, item) => {
  accum[item.name] = item;
  return accum;
}, {});


const obj2 = array.reduce<Record<string, typeof array[number]>>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

const obj3 = array.reduce((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {} as Record<string, typeof array[number]>);

it("Should resolve to an object where name is the key", () => {
  expect(obj).toEqual({
    John: {
      name: "John",
    },
    Steve: {
      name: "Steve",
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});
