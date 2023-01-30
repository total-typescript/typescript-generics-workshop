import { F } from "ts-toolbelt";
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

const makeTranslations = <TTranslations extends Record<string, string>>(
  translations: F.Narrow<TTranslations>,
) => {
  return translations;
};

const translate = <
  TTranslations extends Record<string, string>,
  TKey extends keyof TTranslations,
  TDynamicParams = GetParamKeysAsUnion<TTranslations[TKey]>,
>(
  translations: TTranslations,
  key: TKey,
  ...args: TDynamicParams extends string ? [Record<TDynamicParams, string>] : []
) => {
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
