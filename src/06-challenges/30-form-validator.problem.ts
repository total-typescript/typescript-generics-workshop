import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const makeFormValidatorFactory_simplified = 
  <Rule extends string>(
    validators: Record<Rule, (value: string) => string | undefined>
  ) => 
    <Key extends string>(
      config: Record<Key, Array<Rule>>
    ) => {
  return (values: Record<Key, string>): Record<Key, string | undefined> => {
    const errors = {} as any;

    for (const key in config) {
      for (const validator of config[key]) {
        const error = validators[validator](values[key]);
        if (error) {
          errors[key] = error;
          break;
        }
      }
    }

    return errors;
  };
};

const makeFormValidatorFactory = 
  <Rule extends string, TError extends (string | undefined) = undefined, ValueType extends any = string>(
    validators: Record<Rule, (value: ValueType) => TError>
  ) => 
    <Key extends (keyof any)>(
      config: Record<Key, Array<Rule>>
    ) => {
  return (values: Record<Key, ValueType>): Record<Key, /* TError */ string | undefined> => {
    const errors = {} as any;

    for (const key in config) {
      for (const validator of config[key]) {
        const error = validators[validator](values[key]);
        if (error) {
          errors[key] = error;
          break;
        }
      }
    }

    return errors;
  };
};


// TODO reimplement so the validator allow different kinds af value for different keys
// const makeFormValidatorFactory_complex = 
//   <Validator extends Record<string, (value: Value) => string | undefined>, Value = string>(
//     validators: Validator
//   ) => 
//     <Key extends (keyof any)>(
//       config: Record<Key, Array<keyof Validator>>
//     ) => {
//   return (values: Record<Key, Parameters<Validator[keyof Validator]>[0]>): Record<Key, ReturnType<Validator[keyof Validator]>> => {
//     const errors = {} as any;

//     for (const key in config) {
//       for (const validator of config[key]) {
//         const error = validators[validator](values[key]);
//         if (error) {
//           errors[key] = error;
//           break;
//         }
//       }
//     }

//     return errors;
//   };
// };


const createFormValidator = makeFormValidatorFactory({
  required: (value) => {
    if (value === "") {
      return "Required";
    }
  },
  minLength: (value) => {
    if (value.length < 5) {
      return "Minimum length is 5";
    }
  },
  email: (value) => {
    if (!value.includes("@")) {
      return "Invalid email";
    }
  },
});

const validateUser = createFormValidator({
  id: ["required"],
  username: ["required", "minLength"],
  email: ["required", "email"],
});

it("Should properly validate a user", () => {
  const errors = validateUser({
    id: "1",
    username: "john",
    email: "Blah",
  });

  expect(errors).toEqual({
    username: "Minimum length is 5",
    email: "Invalid email",
  });

  type test = Expect<
    Equal<
      typeof errors,
      {
        id: string | undefined;
        username: string | undefined;
        email: string | undefined;
      }
    >
  >;
});

it("Should not allow you to specify a validator that does not exist", () => {
  createFormValidator({
    // @ts-expect-error
    id: ["i-do-not-exist"],
  });
});

it("Should not allow you to validate an object property that does not exist", () => {
  const validator = createFormValidator({
    id: ["required"],
  });

  validator({
    // @ts-expect-error
    name: "123",
  });
});

it("Should allow you to validate an object property that are not numbers", () => {
  const createFormValidator = makeFormValidatorFactory({
    required: (value) => {
      if (value === undefined) {
        return "Required";
      }
    },
    positive: (value: number) => {
      if (value > 0) {
        return "Minimum value is 1";
      }
    }
  });

  const validator = createFormValidator({
    id: ["required"],
    age: ["positive"],
  });

  validator({
    // @ts-expect-error
    id: undefined
  });

  validator({
    id: 1,
    age: 123,
  });
});
