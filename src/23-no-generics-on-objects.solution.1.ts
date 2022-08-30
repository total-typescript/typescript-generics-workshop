/**
 * This solution works, but means we need to specify the routes
 * TWICE - once in the routes array, and once in the generic
 * we pass to ConfigObj
 */

interface ConfigObj<TRoute extends string> {
  routes: TRoute[];
  fetchers: {
    [K in TRoute]?: () => any;
  };
}

export const configObj: ConfigObj<"/" | "/about" | "/contact"> = {
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
};
