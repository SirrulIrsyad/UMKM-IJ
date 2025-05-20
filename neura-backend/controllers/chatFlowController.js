// controllers/chatFlowController.js
const ChatFlow = require("../models/ChatFlow");

// ✅ Ambil semua flow milik user yang sedang login
exports.getUserChatFlows = async (req, res) => {
  try {
    const flows = await ChatFlow.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(flows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil chatflow" });
  }
};

// ✅ Buat flow baru untuk user
exports.createChatFlow = async (req, res) => {
  const { name, nodes } = req.body;

  try {
    const newFlow = await ChatFlow.create({
      userId: req.user.id,
      name,
      nodes: nodes || [],
    });
    res.status(201).json(newFlow);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat chatflow" });
  }
};
