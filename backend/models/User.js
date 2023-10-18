const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "User password is required"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },

  image: {
    type: String,
    default: "",
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
