const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "slug name is required"],
      unique: true,
      lowerCase: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [10, "description must be at least 10 characters"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "price is required"],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: "price must be greater than 0",
      },
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },

    category: {
      type: String,
      required: [true, "category is required"],
    },

    brand: {
      type: String,
      required: [true, "brand is required"],
    },

    inStock: {
      type: Boolean,
      required: [true, "stock is required"],
    },

    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: "quantity must be greater than 0",
      },
    },
    sold: {
      type: Number,
      required: [true, "sold quantity is required"],
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: "sold quantity must be greater than 0",
      },
    },

    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    totalRatings: {
      type: Number,
      default: 0,
    },


  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
module.exports = Product;
