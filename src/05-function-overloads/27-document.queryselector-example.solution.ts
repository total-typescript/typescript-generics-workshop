import { Equal, Expect } from "../helpers/type-utils";

const divElement = document.querySelector("div");
const spanElement = document.querySelector("span");

/**
 * The reason that divElement2 is not of type HTMLDivElement
 * is because the querySelector method has multiple
 * overloads.
 *
 * The first overload accepts keyof HTMLElementTagNameMap
 * as the first argument.
 *
 * The second overload accepts keyof SVGElementTagNameMap
 * as the first argument.
 *
 * The third overload accepts a string as the first argument.
 *
 * div.foo is not a valid key in HTMLElementTagNameMap or
 * SVGElementTagNameMap, so the third overload is used -
 * which returns an HTMLElement.
 */

/**
 * Here, I've used a type argument to get it to return
 * the expected type
 */
const divElement2 = document.querySelector<HTMLDivElement>("div.foo");

type tests = [
  Expect<Equal<typeof divElement, HTMLDivElement | null>>,
  Expect<Equal<typeof spanElement, HTMLSpanElement | null>>,
  Expect<Equal<typeof divElement2, HTMLDivElement | null>>,
];
