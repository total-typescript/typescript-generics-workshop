import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const createClassNamesFactory =
  (classes: unknown) =>
  (type: unknown, ...otherClasses: unknown[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };

const getBg = createClassNamesFactory({
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
});

it("Should let you create classes from a className factory", () => {
  expect(getBg("primary")).toEqual("bg-blue-500");
  expect(getBg("secondary")).toEqual("bg-gray-500");
});

it("Should let you pass additional classes which get appended", () => {
  expect(getBg("primary", "text-white", "rounded", "p-4")).toEqual(
    "bg-blue-500 text-white rounded p-4"
  );
});

it("Should return a type of string", () => {
  const result = getBg("primary");

  type test = Expect<Equal<typeof result, string>>;
});

it("Should not let you pass invalid variants", () => {
  // @ts-expect-error
  getBg("123123");
});

it("Should not let you pass an invalid object to createClassNamesFactory", () => {
  // @ts-expect-error
  createClassNamesFactory([]);

  // @ts-expect-error
  createClassNamesFactory(123);

  createClassNamesFactory({
    // @ts-expect-error
    a: 1,
  });
});
