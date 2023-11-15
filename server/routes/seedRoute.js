const express = require("express");
const { seedProduct } = require("../controllers/seedController");
const seedRoute = express.Router();

seedRoute.get("/products", seedProduct);

module.exports = seedRoute;
