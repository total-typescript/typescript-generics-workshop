import { Equal, Expect } from "../helpers/type-utils";

export const makeSelectors = <
  TSource,
  TSelectors extends Record<string, (source: TSource) => any>,
>(
  selectors: TSelectors,
) => {
  return selectors;
};

interface Source {
  firstName: string;
  middleName: string;
  lastName: string;
}

// This doesn't work because TS can't infer the selectors type -
// if you pass a SINGLE type argument it won't try to infer any
// of the others
const selectors = makeSelectors<Source>({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
});

type tests = [
  Expect<Equal<typeof selectors["getFullName"], (source: Source) => string>>,
  Expect<
    Equal<typeof selectors["getFirstAndLastName"], (source: Source) => string>
  >,
  Expect<
    Equal<typeof selectors["getFirstNameLength"], (source: Source) => number>
  >,
];
