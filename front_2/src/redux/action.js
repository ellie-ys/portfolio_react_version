export const login = (auth) => ({
  type: "LOGIN",
  auth: auth,
  isLoggedIn: true,
});

export const logout = () => ({
  type: "LOGOUT",
  auth: {},
  isLoggedIn: false,
});
