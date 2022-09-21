import { fetch } from "cross-fetch";

global.fetch = fetch;

let storage = {} as any;

global.localStorage = {
  getItem: (key: string) => storage[key],
  setItem: (key: string, value: string) => {
    storage[key] = value;
  },
  removeItem: (key: string) => {
    delete storage[key];
  },
} as Storage;
