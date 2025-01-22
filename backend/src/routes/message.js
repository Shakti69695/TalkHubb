const express = require("express");
const { userLogin } = require("../middlewares/userAuth");
const Messages = require("../model/Messages");
const { getReceiverSocketId, io } = require("../middlewares/socket");
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

    res.send("Message send successfully");
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

module.exports = { messageRouter };
