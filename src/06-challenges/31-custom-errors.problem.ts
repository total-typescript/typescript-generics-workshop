import { expect, it } from "vitest";

class ErrorWithCode extends Error {
  numericCode: number;
  code: string;

  constructor(message: string, code: string, numericCode: number) {
    super(message);
    this.numericCode = numericCode;
    this.code = code;
  }
}

const createErrorFactory = <
  TErrors extends Record<
    string,
    {
      defaultMessage: string;
      numericCode: number;
    }
  >,
>(
  errors: TErrors,
) => {
  return (code: keyof TErrors) => {
    const message = errors[code].defaultMessage;
    const numericCode = errors[code].numericCode;

    return new ErrorWithCode(message, code as string, numericCode);
  };
};

const createError = createErrorFactory({
  unauthorized: { defaultMessage: "Unauthorized", numericCode: 401 },
  forbidden: { defaultMessage: "Forbidden", numericCode: 403 },
  notFound: { defaultMessage: "Not Found", numericCode: 404 },
  conflict: { defaultMessage: "Conflict", numericCode: 409 },
  internalServerError: {
    defaultMessage: "Internal Server Error",
    numericCode: 500,
  },
});

it("Should create an error with a message", () => {
  const error = createError("unauthorized");

  expect(error.message).toEqual("Unauthorized");
  expect(error.code).toEqual("unauthorized");
  expect(error.numericCode).toEqual(401);

  expect(error instanceof Error).toEqual(true);
});
