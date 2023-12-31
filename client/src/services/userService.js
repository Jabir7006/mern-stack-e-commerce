import axios from "axios";
axios.defaults.withCredentials = true;

export const baseUrl = "http://localhost:3000";

export const handleRegister = async (userdata) => {
  const response = await axios.post(`${baseUrl}/api/users/register`, userdata);

  return response.data;
};

export const handleActivate = async (accessToken) => {
  const response = await axios.post(`${baseUrl}/api/users/activate`, {
    accessToken,
  });

  return response.data;
};

export const handleLogin = async (userdata) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, userdata);

  return response.data;
};

export const handleLogout = async () => {
  const response = await axios.get(`${baseUrl}/api/auth/logout`);

  return response.data;
};

export const handleUpdateUser = async (userData, id) => {
  const response = await axios.put(`${baseUrl}/api/users/update/${id}`, userData);

  return response.data;
};
