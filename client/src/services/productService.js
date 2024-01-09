import axios from "axios";
axios.defaults.withCredentials = true;
import { baseUrl } from "./userService";

export const handleGetProducts = async (
  {search = "",
  category = "",
  brand = [],
  limit = 8,
  page = 1,
  sort = ""}
) => {
  const response = await axios.get(
    `${baseUrl}/api/products?search=${search}&category=${category}&brand=${brand}&limit=${limit}&page=${page}&sort=${sort}`
  );
  return response.data;
};

export const handleGetSingleProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/api/products/${id}`);
  return response.data;
};

export const handleRatingProduct = async (star, prodId, comment) => {
  const response = await axios.put(`${baseUrl}/api/products/rating`, {
    star,
    prodId,
    comment,
  });
  return response.data;
};


export const handleGetAllCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/products/categories`);
  return response.data;
};
