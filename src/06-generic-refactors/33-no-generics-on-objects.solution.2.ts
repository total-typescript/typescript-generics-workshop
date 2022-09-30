interface ConfigObj<TRoute extends string> {
  routes: TRoute[];
  fetchers: {
    [K in TRoute]?: () => any;
  };
}

/**
 * The solution is to use an identity function containing
 * a generic, which will capture the names of the routes and
 * allow the user to specify the fetchers.
 */
const makeConfigObj = <TRoute extends string>(config: ConfigObj<TRoute>) =>
  config;

export const configObj = makeConfigObj({
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
});
