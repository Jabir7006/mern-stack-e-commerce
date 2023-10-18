const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const createError = require("http-errors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);

  await connectDB();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// client error handling //

app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

//server error handling //

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
