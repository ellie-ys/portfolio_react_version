export const login = (access_token) => ({
  type: "LOGIN",
  access_token: access_token,
  isLoggedIn: true,
});

export const logout = () => ({
  type: "LOGOUT",
  access_token: {},
  isLoggedIn: false,
});
