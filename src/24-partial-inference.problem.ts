import { Equal, Expect } from "./helpers/type-utils";

export const makeSelectors = <TSource>(
  selectors: Record<string, (source: TSource) => any>,
) => {
  return selectors;
};

interface Source {
  a: string;
  b: number;
  c: boolean;
}

const selectors = makeSelectors<Source>({
  getA: (source) => source.a,
  getB: (source) => source.b,
  getC: (source) => source.c,
});

// We should be able to infer the type of the selectors object
// from what we passed in to makeSelectors
type tests = [
  Expect<Equal<typeof selectors["getA"], (source: Source) => string>>,
  Expect<Equal<typeof selectors["getB"], (source: Source) => number>>,
  Expect<Equal<typeof selectors["getC"], (source: Source) => boolean>>,
];
