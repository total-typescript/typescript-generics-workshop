import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export function youSayGoodbyeISayHello(greeting: "hello"): "goodbye"
export function youSayGoodbyeISayHello(greeting: "goodbye"): "hello"
export function youSayGoodbyeISayHello(greeting: "goodbye" | "hello") {
  return greeting === "goodbye" ? "hello" : "goodbye";
};

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
