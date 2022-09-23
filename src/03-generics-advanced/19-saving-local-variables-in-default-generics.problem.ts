type GetFirstName<TName> = TName extends `${infer TFirstName} ${string}`
  ? TFirstName
  : never;

interface Names {
  a: "Matt Pocock";
  b: "Han Solo";
  c: "Jimi Hendrix";
  d: "Madonna";
}

type MakeFirstNameObject<TObj extends Record<string, string>> = {
  [K in keyof TObj]: GetFirstName<TObj[K]>;
};
