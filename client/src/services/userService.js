import axios from "axios";
axios.defaults.withCredentials = true;

export const baseUrl = "http://localhost:3000";

export const handleRegister = async (userdata) => {
  const response = await axios.post(`${baseUrl}/api/users/register`, userdata);

  return response.data;
};

export const handleActivate = async (accessToken) => {
  const response = await axios.post(`${baseUrl}/api/users/activate`, {
    accessToken
  });

  return response.data;
};

export const handleLogin = async (userdata) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, userdata);

  return response.data;
};
