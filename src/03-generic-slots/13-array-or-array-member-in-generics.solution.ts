import { Equal, Expect } from "../helpers/type-utils";

const makeStatus = <TStatus extends string>(statuses: TStatus[]) => {
  return statuses;
};

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>,
];
