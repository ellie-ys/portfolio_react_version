export const login = (access_token, refresh_token, user_id) => ({
  type: "LOGIN",
  access_token: access_token,
  refresh_token: refresh_token,
  user_id: user_id,
  isLoggedIn: true,
});

export const logout = () => ({
  type: "LOGOUT",
  access_token: {},
  refresh_token: {},
  user_id: 0,
  isLoggedIn: false,
});
