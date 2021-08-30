import axios from "axios";

export const loginRequest = async (email, password) => {
  const response = await axios.post(`/api/auth/login`, {
    email,
    password,
  });
  const userId = response.data.user.id;
  window.sessionStorage.setItem("id", userId);
  return userId;
};

export const logoutRequest = async () => {
  await axios.get(`/api/auth/logout`);
  window.sessionStorage.clear();
};

export const registerRequest = async (email, password, name) => {
  await axios.post(`/api/auth/register`, {
    email,
    password,
    name,
  });
};
