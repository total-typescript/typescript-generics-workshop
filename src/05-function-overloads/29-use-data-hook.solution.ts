import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function useData<T>(params: { fetchData: () => Promise<T> }): {
  getData: () => T | undefined;
};
function useData<T>(params: { fetchData: () => Promise<T>; initialData: T }): {
  getData: () => T;
};
function useData<T>(params: { fetchData: () => Promise<T>; initialData?: T }): {
  getData: () => T | undefined;
} {
  let data = params.initialData;

  params.fetchData().then((d) => {
    data = d;
  });

  return {
    getData: () => data,
  };
}

it("Should return undefined if no initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number | undefined>>;
});

it("Should NOT return undefined if initial data is passed", () => {
  const numData = useData({
    fetchData: () => Promise.resolve(1),
    initialData: 2,
  });

  const data = numData.getData();

  type Test1 = Expect<Equal<typeof data, number>>;
});
