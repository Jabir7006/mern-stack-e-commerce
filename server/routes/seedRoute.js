const express = require("express");
const { seedProduct, seedBlog } = require("../controllers/seedController");
const seedRoute = express.Router();

seedRoute.get("/products", seedProduct);
seedRoute.get("/blogs", seedBlog);

module.exports = seedRoute;
