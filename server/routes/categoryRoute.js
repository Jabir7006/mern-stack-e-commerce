const express = require("express");
const {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const categoryRoute = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

categoryRoute.get("/", getAllCategories);
categoryRoute.post("/create", isLoggedIn, isAdmin, createCategory);
categoryRoute.get("/:slug", getSingleCategory);
categoryRoute.put("/:slug", isLoggedIn, updateCategory);
categoryRoute.delete("/:slug", isLoggedIn, deleteCategory);

module.exports = categoryRoute;
