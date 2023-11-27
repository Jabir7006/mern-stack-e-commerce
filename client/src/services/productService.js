import axios from "axios";
import { baseUrl } from "./userService";
axios.defaults.withCredentials = true;


export const handleGetProducts = async (search = "", category = "", limit = 8, page = 1, sort = "") => {
    const response = await axios.get(`${baseUrl}/api/products?search=${search}&category=${category}&limit=${limit}&page=${page}&sort=${sort}`);
    return response.data;
};



export const handleGetSingleProduct = async (slug) => {
    const response = await axios.get(`${baseUrl}/api/products/${slug}`);
    return response.data;
};

