import axios from "axios";
axios.defaults.withCredentials = true;

export const baseURL = "http://localhost:3000";

export const handleRegister = async (userData) => {
  const response = await axios.post(`${baseURL}/api/users/register`, userData);

  return response.data;
};

export const handleActivate = async (activationToken) => {
  const response = await axios.post(`${baseURL}/api/users/activate`, { activationToken });

  return response.data;
};

export const handleLogin = async (userData) => {
  const response = await axios.post(`${baseURL}/api/auth/login`, userData);

  return response.data;
};

export const handleCheckLogin = async () => {
  const response = await axios.get(`${baseURL}/api/auth/verify`);

  return response;
};
