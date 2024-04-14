const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  shippingInfo: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    },

    saveInfo: {
      type: Boolean,
      default: false,
    },

    note: String,
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],


  totalPrice: {
    type: Number,
    required: true,
  },

  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },

  orderStatus: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    required: true,
  },

  paidAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  deliveredAt: {
    type: Date,
  }
});

const Order = model("Order", orderSchema);

module.exports = Order;

