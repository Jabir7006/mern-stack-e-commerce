const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
