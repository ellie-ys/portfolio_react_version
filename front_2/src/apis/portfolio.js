import axios from "axios";

export const fetchPortfolio = async (userId) => {
  const response = await axios.get(
    "http://kdt-1st-project-77.koreacentral.cloudapp.azure.com/api/portfolio/${userId}"
  );
  return response.data.portfolio;
};
