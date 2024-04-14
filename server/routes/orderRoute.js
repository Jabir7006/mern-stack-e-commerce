const express = require('express');
const { createOrder } = require('../controllers/orderController');
const orderRoute = express.Router();

orderRoute.post("/create-order", createOrder);


module.exports = orderRoute
