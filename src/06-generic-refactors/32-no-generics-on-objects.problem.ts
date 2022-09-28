export const configObj = {
  routes: ["/", "/about", "/contact"],
  /**
   * fetchers is an object where you can optionally
   * pass keys that match the route names.
   *
   * BUT - how do we prevent the user from passing
   * fetchers that don't exist in the routes array?
   *
   * Note - the solutions both SIGNIFICANTLY refactor
   * this code.
   */
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {};
    },
  },
};
