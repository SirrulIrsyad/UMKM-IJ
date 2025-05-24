const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, getMessages); 
// Reset semua pesan milik user
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const Chat = require("../models/Chat"); // pastikan model Chat sesuai path kamu
    await Chat.deleteMany({ userId: req.user.id });
    res.status(200).json({ message: "Semua pesan telah dihapus." });
  } catch (err) {
    console.error("Gagal reset pesan:", err);
    res.status(500).json({ error: "Gagal menghapus semua pesan." });
  }
});


module.exports = router;
