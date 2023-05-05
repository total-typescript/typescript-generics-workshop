type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
): Person[keyof Person] {
  if (key === "birthdate") {
    return new Date();
  }

  return value;
}