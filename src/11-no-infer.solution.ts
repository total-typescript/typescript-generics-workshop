import { F } from "ts-toolbelt";

interface Config<TState extends string> {
  initial: F.NoInfer<TState>;
  states: Record<TState, {}>;
}

export const makeStateMachine = <TState extends string>(
  config: Config<TState>,
) => {};

makeStateMachine({
  initial: "a",
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
  },
});

makeStateMachine({
  // c should not be allowed! It doesn't exist on the states below
  // @ts-expect-error
  initial: "c",
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
  },
});
