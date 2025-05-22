const Message = require("../models/Message");
const Chatflow = require("../models/ChatFlow");
const ChatflowDetail = require("../models/ChatflowDetail");
const aliasMap = require("../utils/aliasMapping");

// Fungsi normalisasi teks (tanpa tanda baca, trim, lowercase)
const normalizeText = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "") // hapus tanda baca
    .replace(/\s+/g, " ");   // hilangkan spasi berlebihan

exports.sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;
  const normalized = normalizeText(message);

  try {
    // Simpan pesan user
    await Message.create({ userId, sender: "user", text: message });

    // Ambil flow TERBARU milik user
    const flow = await Chatflow.findOne({ userId }).sort({ createdAt: -1 });
    if (!flow) return res.json({ reply: "Flow belum dibuat." });

    const flowDetail = await ChatflowDetail.findOne({
      userId,
      flowId: flow._id.toString(),
    });

    if (!flowDetail || !flowDetail.blocks || flowDetail.blocks.length === 0) {
      return res.json({ reply: "Isi chatbot belum tersedia." });
    }

    // 🔎 Coba cari alias dari pertanyaan
    const keyword = aliasMap[normalized] || normalized;

    // Debug log untuk bantu lacak
    console.log("🔎 Pesan user:", message);
    console.log("🔎 Normalized:", normalized);
    console.log("🔎 Keyword hasil aliasMapping:", keyword);
    console.log("📦 Pertanyaan FAQ:", flowDetail.blocks.map(b => b.question));

    // 🔍 Cari blok FAQ berdasarkan keyword hasil alias
    const matchedFAQ = flowDetail.blocks.find(
      (b) =>
        b.type?.toLowerCase() === "faq" &&
        normalizeText(b.question) === keyword
    );

    const replyText = matchedFAQ
      ? matchedFAQ.answer
      : "Maaf, saya belum mengerti. Coba ulangi pertanyaannya.";

    // Simpan balasan bot
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
