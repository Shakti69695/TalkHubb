const express = require("express");

const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const connectDB = require("./src/config/database");
const { authRouter } = require("./src/routes/auth");
const { userRouter } = require("./src/routes/user");
const { messageRouter } = require("./src/routes/message");
const { app, server } = require("./src/middlewares/socket");

app.use(
  cors({
    origin: FRONTEND_URL, // Add the specific URL of your frontend
    credentials: true, // Allow credentials (cookies) to be sent
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(messageRouter);
app.use("/", (req, res) => {
  res.send("Hello from Backend!!!!!!!!");
});

connectDB()
  .then(() => {
    console.log("dB connected");
    // server.listen(PORT, () => {
    //   console.log("server started");
    // });
  })
  .catch((err) => {
    console.log("error in db");
  });

  module.exports= app;