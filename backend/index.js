const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();
const createError = require("http-errors");
const connectDB = require("./config/db");

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);

  await connectDB();
});

app.use("/", (req, res) => {
  res.send("Hello World!");
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
