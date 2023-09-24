import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

function youSayGoodbyeISayHello_generic<T extends "goodbye" | "hello">(greeting: T): T extends "goodbye" ? "hello" : "goodbye" {
  return greeting === "goodbye" ? "hello" : "goodbye" as any;
}

function youSayGoodbyeISayHello(greeting: "hello"): "goodbye"
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello"
function youSayGoodbyeISayHello(greeting: any): any {
  return greeting === "goodbye" ? "hello" : "goodbye";
}

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


// @ts-expect-error
youSayGoodbyeISayHello("dupa")

// @ts-expect-error
youSayGoodbyeISayHello(true)