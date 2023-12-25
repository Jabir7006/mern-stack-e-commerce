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
const {uploadProductImage} = require("../middlewares/imageUpload");

productRoute.get("/", getAllProducts);
productRoute.get("/categories", getAllCategoriesAndBrands);
productRoute.put("/rating", isLoggedIn, rating);
productRoute.post("/create", isLoggedIn, uploadProductImage.single("image"), createProduct);
productRoute.get("/:id", getSingleProduct);
productRoute.put("/:id", isLoggedIn, uploadProductImage.single("image"), updateProduct);
productRoute.delete("/:id", deleteProduct);


module.exports = productRoute;
