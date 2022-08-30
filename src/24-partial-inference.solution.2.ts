import { Equal, Expect } from "./helpers/type-utils";

export const makeSelectors =
  <TSource>() =>
  <TSelectors extends Record<string, (source: TSource) => any>>(
    selectors: TSelectors,
  ) => {
    return selectors;
  };

interface Source {
  a: string;
  b: number;
  c: boolean;
}

// The solution is to turn it into a curried function
const selectors = makeSelectors<Source>()({
  getA: (source) => source.a,
  getB: (source) => source.b,
  getC: (source) => source.c,
});

type tests = [
  Expect<Equal<typeof selectors["getA"], (source: Source) => string>>,
  Expect<Equal<typeof selectors["getB"], (source: Source) => number>>,
  Expect<Equal<typeof selectors["getC"], (source: Source) => boolean>>,
];
