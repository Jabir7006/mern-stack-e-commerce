const Blog = require("../models/Blog");
const createError = require("http-errors");
const successResponse = require("./successController");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find()
      .populate("likedBy", "_id")
      .populate("dislikedBy", "_id")
      .populate("author", "firstName lastName image")
      .exec();

    if (!allBlogs || allBlogs.length === 0) {
      throw createError(404, "No blogs found");
    }

    // Calculate total likes for each blog
    const blogs = allBlogs.map((blog) => {
      const totalLikes = blog.likedBy.length;
      return {
        ...blog.toObject(),
        totalLikes,
      };
    });

    return successResponse(res, {
      statusCode: 200,
      payload: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const { id } = req.user;
    if (!title || !content) throw createError(400, "all fields are required");

    const imagePath = req.file && `public/images/blogs/${req.file.filename}`;

    const blog = await Blog.create({
      thumbnail: imagePath,
      title,
      content,
      category,
      author: id,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "blog created successfully",
      payload: blog,
    });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, "..", "public", "images", "blogs", req.file.filename);
      fs.unlinkSync(filePath);
    }
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("likedBy", "firstName lastName")
      .populate("dislikedBy", "firstName lastName")
      .populate("author", "firstName lastName image")
      .exec();

    if (!blog) throw createError(404, "no blog found");

    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    const totalLikes = blog.likedBy.length;
    const totalDislikes = blog.dislikedBy.length;

    return successResponse(res, {
      statusCode: 200,
      payload: {
        blog,
        totalLikes,
        totalDislikes,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const getBlog = await Blog.findById(id);

    if (!getBlog) {
      throw createError(404, "blog not found with this id");
    }

    if (getBlog.image !== "public/images/blogs/undefined" && req.file) {
      const oldImagePath = path.join(__dirname, "..", getBlog.thumbnail);
      fs.unlinkSync(oldImagePath);
    }

    const imagePath = req.file && `public/images/blogs/${req.file.filename}`;

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content: content,
        thumbnail: imagePath,
      },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "blog updated successfully",
      payload: blog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      throw createError(404, "no blog found with this id");
    }

    //delete image

    if (blog.thumbnail !== "public/images/products/undefined") {
      const oldImagePath = path.join(__dirname, "..", blog.thumbnail);
      fs.unlinkSync(oldImagePath);
    }

    // Delete the product
    await Blog.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "blog was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const likeBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const blog = await Blog.findById(id);

    if (!blog) {
      throw createError(404, "blog not found with this id");
    }

    const isLiked = blog.likedBy.includes(user._id);
    const isDisliked = blog.dislikedBy.includes(user._id);

    if (isLiked) {
      // If already liked, remove like
      blog.likedBy.pull(user._id);
    } else {
      // If not liked, add like and remove dislike if already disliked
      blog.likedBy.push(user._id);
      if (isDisliked) {
        blog.dislikedBy.pull(user._id);
      }
    }

    await blog.save();

    return successResponse(res, {
      statusCode: 200,
      message: isLiked ? "Like removed successfully" : "Blog liked successfully",
      payload: blog,
    });
  } catch (error) {
    next(error);
  }
};

const dislikeBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const blog = await Blog.findById(id);

    if (!blog) {
      throw createError(404, "blog not found with this id");
    }

    const isLiked = blog.likedBy.includes(user._id);
    const isDisliked = blog.dislikedBy.includes(user._id);

    if (isDisliked) {
      // If already disliked, remove dislike
      blog.dislikedBy.pull(user._id);
    } else {
      // If not disliked, add dislike and remove like if already liked
      blog.dislikedBy.push(user._id);
      if (isLiked) {
        blog.likedBy.pull(user._id);
      }
    }

    await blog.save();

    return successResponse(res, {
      statusCode: 200,
      message: isDisliked ? "Dislike removed successfully" : "Blog disliked successfully",
      payload: blog,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // ... (existing exports)
  likeBlog,
  dislikeBlog,
};

module.exports = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
