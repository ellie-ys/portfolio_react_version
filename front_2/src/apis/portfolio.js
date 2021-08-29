import axios from "axios";

export const fetchPortfolio = async (userId) => {
  const response = await axios.get(
    "/api/portfolio/${userId}"
  );
  return response.data.portfolio;
};
