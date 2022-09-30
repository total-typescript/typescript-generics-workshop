import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface State {
  isLoggedIn: boolean;
}

type Event =
  | {
      type: "LOGIN";
    }
  | {
      type: "LOGOUT";
    };

export const makeReducer =
  (config: unknown) => (state: unknown, event: unknown) => {};

it("Should create a reducer which can handle all events", () => {
  const reducer = makeReducer<State, Event>({
    initial: {
      isLoggedIn: false,
    },
    events: {
      LOGIN: (state, event) => {
        type tests = [Expect<Equal<typeof event, { type: "LOGIN" }>>];
        return { ...state, isLoggedIn: true };
      },
      LOGOUT: (state, event) => {
        type tests = [Expect<Equal<typeof event, { type: "LOGOUT" }>>];
        return { ...state, isLoggedIn: false };
      },
    },
  });

  const loggedInState = reducer({ isLoggedIn: false }, { type: "LOGIN" });

  expect(loggedInState.isLoggedIn).toEqual(true);

  const loggedOutState = reducer({ isLoggedIn: true }, { type: "LOGOUT" });

  expect(loggedOutState.isLoggedIn).toEqual(false);

  type tests = [
    Expect<Equal<typeof loggedInState, State>>,
    Expect<Equal<typeof loggedOutState, State>>,
  ];
});

it("Should not allow invalid keys to be passed to state", () => {
  const reducer = makeReducer<State, Event>({
    initial: {
      isLoggedIn: false,
      // @ts-expect-error
      notAllowed: true,
    },
    events: {
      LOGIN: (state) => ({ ...state, isLoggedIn: true }),
      LOGOUT: (state) => ({ ...state, isLoggedIn: false }),
      // @ts-expect-error
      LOGROUND: (state) => ({ ...state, isLoggedIn: false }),
    },
  });

  type tests = [
    Expect<Equal<typeof reducer, (state: State, event: Event) => State>>,
  ];
});
