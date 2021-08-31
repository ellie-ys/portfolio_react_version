import axios from "axios";

export const fetchPortfolio = async (userId) => {
  const response = await axios.get(
    `http://localhost:5000/api/portfolio/${userId}`
  );
  return response.data.portfolio;
};
