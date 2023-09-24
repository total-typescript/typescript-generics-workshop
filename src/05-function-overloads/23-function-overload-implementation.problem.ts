import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}

function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(role: string):  AnonymousPrivileges | UserPrivileges | AdminPrivileges  {
  switch (role) {
    case "admin":
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      } satisfies AdminPrivileges as AdminPrivileges;
    case "user":
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      } satisfies UserPrivileges as UserPrivileges;
    default:
      return {
        sitesCanVisit: [],
      } satisfies AnonymousPrivileges as AnonymousPrivileges;
  }
}


it("Should return the correct privileges", () => {
  const adminPrivileges = getRolePrivileges("admin");

  const userPrivileges = getRolePrivileges("user");
  const anonymousPrivileges = getRolePrivileges("anonymous");

  type tests = [
    Expect<Equal<typeof adminPrivileges, AdminPrivileges>>,
    Expect<Equal<typeof userPrivileges, UserPrivileges>>,
    Expect<Equal<typeof anonymousPrivileges, AnonymousPrivileges>>,
  ];
});
