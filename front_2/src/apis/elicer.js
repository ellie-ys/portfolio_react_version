import axios from "axios";

export const getUserRequest = async (userId) => {
  const response = await axios.get("/api/elicer/${userId}");
  return response.data.user;
};

export const updateUserRequest = async (userId, name, description) => {
  await axios.patch("/api/elicer/${userId}", {
    name,
    description,
  });
};

export const updateProfileImage = async (userId, image) => {
  await axios.patch("/api/elicer/${userId}/image", {
    image,
  });
};

export const networkUsers = async (query) => {
  const response = await axios.get("/api/elicer?query=${query}");
  return response.data.users;
};

export const searchUsers = async (query) => {
  const response = await axios.get("/api/elicer?query=${query}");
  return response.data.users;
};
