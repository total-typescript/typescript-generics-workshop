import { expect, it } from "vitest";

const makeFormValidatorFactory = (validators: unknown) => (config: unknown) => {
  return (values: unknown) => {
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
});

it("Should not allow you to specify a validator that does not exist", () => {
  createFormValidator({
    // @ts-expect-error
    id: ["i-do-not-exist"],
  });
});
