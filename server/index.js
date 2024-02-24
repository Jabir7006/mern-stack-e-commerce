const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const connectDB = require("./configs/db");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const seedRoute = require("./routes/seedRoute");
const blogRoute = require("./routes/blogRoute");
require("dotenv").config();

connectDB();
app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.103:5173",
  "https://mern-ecommerce-app-6q33.onrender.com",
  "http://localhost:4173",
  "https://mern-stack-e-commerce-seven.vercel.app"

];

const corsConfig = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/seed", seedRoute);
app.use("/api/blogs", blogRoute);

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
