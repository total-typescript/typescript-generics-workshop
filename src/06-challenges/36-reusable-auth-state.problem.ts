interface LoggedInData {
  id: string;
  name: string;
  role: "admin" | "user";
}

const authState = makeAuthState<LoggedInData>({
  fetchUserData: () => Promise.resolve({ name: "John" }),
});
