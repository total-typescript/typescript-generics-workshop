import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type ValidatorsBase = Record<string, (value: string) => string | void>;

type ValidatorConfig<ValidatorKey> = Record<string, Array<ValidatorKey>>;

const makeFormValidatorFactory =
  <TValidators extends ValidatorsBase>(validators: TValidators) =>
  <TInput extends ValidatorConfig<keyof TValidators>>(config: TInput) => {
    return (
      values: Record<keyof TInput, string>
    ): Record<keyof TInput, string | undefined> => {
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
