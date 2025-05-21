// controllers/chatController.js
const Message = require("../models/Message");
const Chatflow = require("../models/ChatFlow");
const ChatflowDetail = require("../models/ChatflowDetail");
const aliasMap = require("../utils/aliasMapping");

exports.sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  const normalized = message.toLowerCase().trim();

  try {
    // Simpan pesan user
    await Message.create({ userId, sender: "user", text: message });

    // Ambil flow TERBARU milik user
    const flow = await Chatflow.findOne({ userId }).sort({ createdAt: -1 });
    if (!flow) return res.json({ reply: "Flow belum dibuat." });

    const flowDetail = await ChatflowDetail.findOne({
      userId,
      flowId: flow._id.toString(), // pastikan string
    });

    if (!flowDetail || !flowDetail.blocks || flowDetail.blocks.length === 0) {
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
  (b) => b.type === "FAQ" && aliasMap[b.question.toLowerCase()] === keyword
);


    const replyText = matchedFAQ
      ? matchedFAQ.answer
      : "Maaf, saya belum menemukan jawabannya.";

    await Message.create({ userId, sender: "bot", text: replyText });

    res.json({ reply: replyText });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ reply: "Terjadi kesalahan di sisi server." });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil pesan" });
  }
};
