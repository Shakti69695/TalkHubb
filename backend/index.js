import express from "express";
import { resolve, join } from "node:path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const PORT = process.env.PORT|| 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
import connectDB from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.js";
import { userRouter } from "./src/routes/user.js";
import { messageRouter } from "./src/routes/message.js";
import { app, server } from "./src/middlewares/socket.js";

const __dirname = resolve();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    console.log("dB connected");
    server.listen(PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("error in db");
  });

export default app;
