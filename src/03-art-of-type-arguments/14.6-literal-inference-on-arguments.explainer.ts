// When returning the value only, it infers
// the literal type
const acceptsValueOnly = <T>(t: T) => {
  return t;
};

const result = acceptsValueOnly("a");
//    ^?

const acceptsValueInAnObject = <T>(obj: { input: T }) => {
  return obj.input;
};

const result2 = acceptsValueInAnObject({ input: "abc" });
//    ^?

const result2WithAsConst = acceptsValueInAnObject({ input: "abc" } as const);
//    ^?

const acceptsValueInAnObjectFieldWithConstraint = <T extends string>(obj: {
  input: T;
}) => {
  return obj.input;
};

const result3 = acceptsValueInAnObjectFieldWithConstraint({ input: "abc" });
//    ^?

const acceptsValueWithObjectConstraint = <
  T extends {
    input: string;
  },
>(
  obj: T,
) => {
  return obj.input;
};

const result4 = acceptsValueWithObjectConstraint({ input: "abc" });

const result4WithAsConst = acceptsValueWithObjectConstraint({
  input: "abc",
} as const);

export {};
