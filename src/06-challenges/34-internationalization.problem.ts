import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// HELPERS

type GetParamKeys<TTranslation extends string> = TTranslation extends ""
  ? []
  : TTranslation extends `${string}{${infer Param}}${infer Tail}`
  ? [Param, ...GetParamKeys<Tail>]
  : [];

type GetParamKeysAsUnion<TTranslation extends string> =
  GetParamKeys<TTranslation>[number];

// CODE

/**
 * In this example, the inner bits of the functions have been built out.
 * Feel free to modify them if needed, but the solution uses this code.
 *
 * Your job is to try and make the solutions type-safe.
 */
const makeTranslations = (translations: unknown) => {
  return translations;
};

const translate = (translations: unknown, key: unknown, ...args: unknown[]) => {
  const translation = translations[key];
  const params: any = args[0] || {};

  return translation.replace(/{(\w+)}/g, (_, key) => params[key]);
};

// TESTS

const translations = makeTranslations({
  title: "Hello, {name}!",
  subtitle: "You have {count} unread messages.",
  button: "Click me!",
});

type tests = [
  Expect<
    Equal<
      typeof translations,
      {
        title: "Hello, {name}!";
        subtitle: "You have {count} unread messages.";
        button: "Click me!";
      }
    >
  >,
];

it("Should translate a translation without parameters", () => {
  const buttonText = translate(translations, "button");

  expect(buttonText).toEqual("Click me!");
});

it("Should translate a translation WITH parameters", () => {
  const subtitle = translate(translations, "subtitle", {
    count: "2",
  });

  expect(subtitle).toEqual("You have 2 unread messages.");
});

it("Should force you to provide parameters if required", () => {
  // @ts-expect-error
  translate(translations, "title");
});

it("Should not let you pass parameters if NOT required", () => {
  // @ts-expect-error
  translate(translations, "button", {});
});
