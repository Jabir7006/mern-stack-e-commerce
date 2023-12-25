import axios from "axios";
import { baseUrl } from "./userService";

export const handleGetAllBlogs = async () => {
    const response = await axios.get(`${baseUrl}/api/blogs`);
    return response.data;
}

export const handleGetSingleBlog = async (id) => {
    const response = await axios.get(`${baseUrl}/api/blogs/${id}`);
    return response.data;
}

export const handleLikeBlog = async (id) => {
    const response = await axios.post(`${baseUrl}/api/blogs/${id}/like`);
    return response.data;
}