import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:3000";

export const handleRegister = async (userData) => {
  const response = await axios.post(`${baseURL}/api/users/register`, userData);

  return response.data;
};

export const handleIsLoggedIn = async (userData) => {
  const response = await axios.get(`${baseURL}/api/auth/verify`);

  return response.data;
};
