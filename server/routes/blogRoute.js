const express = require('express');
const { getAllBlogs, createBlog, getSingleBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog } = require('../controllers/blogController');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const blogRoute = express.Router();
const upload = require('../middlewares/blogImgUpload');

blogRoute.get("/", getAllBlogs);
blogRoute.post("/create", isLoggedIn, isAdmin, upload.single("thumbnail"), createBlog);
blogRoute.post("/:id/like", isLoggedIn, likeBlog);
blogRoute.post("/:id/dislike", isLoggedIn, dislikeBlog);
blogRoute.get("/:id", getSingleBlog);
blogRoute.put("/:id", isLoggedIn, isAdmin, upload.single("thumbnail"), updateBlog);

blogRoute.delete("/:id", isLoggedIn, isAdmin, deleteBlog);



module.exports = blogRoute