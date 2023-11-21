import axios from "axios";
import { baseUrl } from "./userService";
axios.defaults.withCredentials = true;


export const handleGetProducts = async () => {
    const response = await axios.get(`${baseUrl}/api/products?limit=8`);
    return response.data;
};

export const handleGetSingleProduct = async (id) => {
    const response = await axios.get(`${baseUrl}/api/products/${id}`);
    return response.data;
};
