import { F } from "ts-toolbelt";

const createCache = <
  TCacheConfig extends Record<
    string,
    {
      normalize: (t: any) => any;
    }
  >,
  ConfigKey extends keyof TCacheConfig,
  NormalizedCacheInputs = {
    [K in ConfigKey]: Parameters<TCacheConfig[K]["normalize"]>[0];
  },
  NormalizedCacheOutputs = {
    [K in ConfigKey]: ReturnType<TCacheConfig[K]["normalize"]>;
  },
>(
  config: F.Narrow<TCacheConfig>,
) => {
  const cache = {} as any;

  return {
    get: <K extends keyof NormalizedCacheOutputs>(
      key: K,
      id: string,
    ): NormalizedCacheOutputs[K] | undefined => {
      return cache[key][id];
    },
    set: <K extends keyof NormalizedCacheInputs>(
      key: K,
      value: NormalizedCacheInputs[K],
    ): void => {
      cache[key] = (config as any)[key].normalize(value);
    },
  };
};

interface User {
  id: string;
  name: string;
}

const cache = createCache({
  user: {
    normalize: (user: User) => user,
  },
});

const user = cache.get("user", "1");

cache.set("user", {
  id: "1",
  name: "John",
});
