const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  rating,
  deleteReview,
  getAllCategoriesAndBrands,
} = require("../controllers/productController");
const { isLoggedIn } = require("../middlewares/auth");
const productRoute = express.Router();


productRoute.get("/", getAllProducts);
productRoute.get("/categories", getAllCategoriesAndBrands);
productRoute.put("/rating", isLoggedIn, rating);
productRoute.post("/create", isLoggedIn, createProduct);
productRoute.get("/:id", getSingleProduct);
productRoute.put("/:id", isLoggedIn, updateProduct);
productRoute.delete("/:id", deleteProduct);


module.exports = productRoute;
