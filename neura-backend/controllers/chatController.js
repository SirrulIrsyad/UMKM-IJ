// controllers/chatController.js
const Message = require("../models/Message");
const Chatflow = require("../models/ChatFlow");
const ChatflowDetail = require("../models/ChatflowDetail");
const aliasMap = require("../utils/aliasMapping");

// 🔹 Tangani permintaan chat (POST /api/chat)
exports.sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  const normalized = message.toLowerCase().trim();

  try {
    // Simpan pesan user
    await Message.create({
      userId,
      sender: "user",
      text: message,
    });

    // Ambil flow aktif milik user
    const flow = await Chatflow.findOne({ userId });
    if (!flow) return res.json({ reply: "Flow belum dibuat." });

    // ✅ Fix: pastikan pencarian flowDetail pakai string ID
    const flowIdStr = flow._id.toString();
    const flowDetail = await ChatflowDetail.findOne({
      userId,
      flowId: flowIdStr,
    });

    if (!flowDetail || !flowDetail.blocks) {
      return res.json({ reply: "Isi chatbot belum tersedia." });
    }

    // Deteksi alias
    const keyword = aliasMap[normalized];
    if (!keyword) {
      const fallback = "Maaf, saya belum mengerti. Coba ulangi pertanyaannya.";
      await Message.create({ userId, sender: "bot", text: fallback });
      return res.json({ reply: fallback });
    }

    // Cari blok FAQ
    const matchedFAQ = flowDetail.blocks.find(
      (b) => b.type === "FAQ" && b.question.toLowerCase().includes(keyword)
    );

    const replyText = matchedFAQ
      ? matchedFAQ.answer
      : "Maaf, saya belum menemukan jawabannya.";

    // Simpan balasan bot
    await Message.create({
      userId,
      sender: "bot",
      text: replyText,
    });

    res.json({ reply: replyText });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ reply: "Terjadi kesalahan di sisi server." });
  }
};

// 🔹 Ambil semua pesan user (GET /api/chat)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil pesan" });
  }
};
