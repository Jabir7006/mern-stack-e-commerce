const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  rating,
} = require("../controllers/productController");
const { isLoggedIn } = require("../middlewares/auth");
const productRoute = express.Router();
const upload = require("../middlewares/productImgUpload");

productRoute.get("/", getAllProducts);
productRoute.post("/create", isLoggedIn, upload.single("image"), createProduct);
productRoute.get("/:id", getSingleProduct);
productRoute.put("/:id", isLoggedIn, upload.single("image"), updateProduct);
productRoute.delete("/:id", deleteProduct);
productRoute.put("/rating", isLoggedIn, rating);

module.exports = productRoute;
