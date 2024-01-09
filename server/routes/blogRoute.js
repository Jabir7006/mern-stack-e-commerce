const express = require('express');
const { getAllBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog } = require('../controllers/blogController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const blogRoute = express.Router();


blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", isLoggedIn, isAdmin,  createBlog);
blogRoute.post("/:id/like", isLoggedIn, likeBlog);
blogRoute.post("/:id/dislike", isLoggedIn, dislikeBlog);
blogRoute.get("/:id", getSingleBlog);
blogRoute.put("/:id", isLoggedIn, isAdmin,  updateBlog);

blogRoute.delete("/:id", isLoggedIn, isAdmin, deleteBlog);



module.exports = blogRoute