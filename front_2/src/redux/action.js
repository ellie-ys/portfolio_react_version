export const login = (access_token, refresh_token, user_id) => ({
  type: "LOGIN",
  access_token: access_token,
  refresh_token: refresh_token,
  user_id: user_id,
  isLogined: true,
});

export const logout = () => ({
  type: "LOGOUT",
  access_token: {},
  refresh_token: {},
  user_id: 0,
  isLogined: false,
});

export const refresh = (access_token) => ({
  type: "REFRESH",
  access_token: access_token,
});
