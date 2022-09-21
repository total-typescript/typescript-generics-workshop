import { Equal, Expect } from "../helpers/type-utils";

export const makeSelectors = <TSource>(
  selectors: Record<string, (source: TSource) => any>,
) => {
  return selectors;
};

interface Source {
  firstName: string;
  middleName: string;
  lastName: string;
}

const selectors = makeSelectors<Source>({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
});

// We should be able to infer the type of the selectors object
// from what we passed in to makeSelectors
type tests = [
  Expect<Equal<typeof selectors["getFullName"], (source: Source) => string>>,
  Expect<
    Equal<typeof selectors["getFirstAndLastName"], (source: Source) => string>
  >,
  Expect<
    Equal<typeof selectors["getFirstNameLength"], (source: Source) => number>
  >,
];
