const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isLoggedIn } = require("../middlewares/auth");
const productRoute = express.Router();
const upload = require("../middlewares/productImgUpload");


productRoute.get("/", getAllProducts);
productRoute.post("/create", isLoggedIn, upload.single("image"), createProduct);
productRoute.get("/:id", getSingleProduct);
productRoute.put("/:id", isLoggedIn, upload.single("image"), updateProduct);
productRoute.delete("/:id", deleteProduct);


module.exports = productRoute;
