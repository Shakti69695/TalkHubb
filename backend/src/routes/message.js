import express from "express";
import { userLogin } from "../middlewares/userAuth.js";
import Messages from "../model/Messages.js";
import { getReceiverSocketId, io } from "../middlewares/socket.js";

const messageRouter = express.Router();

messageRouter.post("/sendMessage/:id", userLogin, async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params["id"];
  const { text, image } = req.body;

  try {
    const message = new Messages({
      senderId,
      receiverId,
      text,
      image,
    });
    await message.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.send("Message sent successfully");
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

messageRouter.get("/getMessage/:id", userLogin, async (req, res) => {
  const myId = req.user._id;
  const receiverId = req.params["id"];
  try {
    const messages = await Messages.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });
    res.send(messages);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

export { messageRouter };
