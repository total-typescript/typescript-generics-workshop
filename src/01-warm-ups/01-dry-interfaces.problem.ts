/**
 * How can we refactor these to reduce the duplication
 * in the 'data' declaration?
 */

import { Equal, Expect } from "../helpers/type-utils";

export interface UserData {
  data: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface PostData {
  data: {
    title: string;
  };
}

export interface CommentData {
  data: {
    comment: string;
  };
}

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
