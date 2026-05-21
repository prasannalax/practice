const Chat = require("../models/Chat");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.json({ message: "Message sent" });
  } catch {
    res.status(500).json({ message: "Error sending message" });
  }
};

// GET MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const chats = await Chat.find({ appointmentId })
      .sort({ createdAt: 1 });

    res.json(chats);
  } catch {
    res.status(500).json({ message: "Error fetching messages" });
  }
};