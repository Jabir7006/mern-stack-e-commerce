const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const successResponse = require("./successController");

const stripePaymentIntent = async (req, res, next) => {
  try {
    const {amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount : amount * 100,
      currency: currency,
    });

    successResponse(res, { statusCode: 200, payload: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    successResponse(res, { statusCode: 201, payload: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to update order by ID
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
