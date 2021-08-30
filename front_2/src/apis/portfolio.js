import axios from "axios";

export const fetchPortfolio = async (userId) => {
  const response = await axios.get(`/portfolio/${userId}`);
  return response.data.portfolio;
};
