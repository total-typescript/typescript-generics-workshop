/**
 * How can we refactor these to reduce the duplication
 * in the 'data' declaration?
 */

import { Equal, Expect } from "./helpers/type-utils";

export type DataContainer<TData> = {
  data: TData;
};

export type UserData = DataContainer<{
  id: string;
  firstName: string;
  lastName: string;
}>;

export type PostData = DataContainer<{
  title: string;
}>;

export type CommentData = DataContainer<{
  comment: string;
}>;

type tests = [
  Expect<
    Equal<
      UserData,
      {
        data: {
          id: string;
          firstName: string;
          lastName: string;
        };
      }
    >
  >,
  Expect<
    Equal<
      PostData,
      {
        data: {
          title: string;
        };
      }
    >
  >,
  Expect<
    Equal<
      CommentData,
      {
        data: {
          comment: string;
        };
      }
    >
  >,
];
