import { Equal, Expect } from "../helpers/type-utils";

type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
): Person[Key] {
  if (key === "birthdate") {
    return new Date();
  }

  return value;
}

const date = remapPerson("birthdate", new Date());
const num = remapPerson("age", 42);
const name = remapPerson("name", "John Doe");

type tests = [
  Expect<Equal<typeof date, Date>>,
  Expect<Equal<typeof num, number>>,
  Expect<Equal<typeof name, string>>,
];
