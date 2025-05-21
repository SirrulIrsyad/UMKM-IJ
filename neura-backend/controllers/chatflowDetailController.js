// controllers/chatflowDetailController.js
const ChatflowDetail = require("../models/ChatflowDetail");

// ✅ Simpan atau update blok detail dari flow tertentu
exports.saveFlowDetail = async (req, res) => {
  const { flowId } = req.params;
  const userId = req.user.id;
  const { blocks } = req.body;

  try {
    let detail = await ChatflowDetail.findOne({ userId, flowId });
    if (!detail) {
      detail = new ChatflowDetail({ userId, flowId, blocks });
    } else {
      detail.blocks = blocks;
    }

    await detail.save();
    res.status(200).json({ success: true, detail });
  } catch (err) {
    console.error("❌ Error saveFlowDetail:", err.message);
    res.status(500).json({ success: false, message: "Gagal menyimpan detail flow" });
  }
};

// ✅ Ambil detail blok berdasarkan flowId milik user
exports.getFlowDetail = async (req, res) => {
  const { flowId } = req.params;
  const userId = req.user.id;

  try {
    const detail = await ChatflowDetail.findOne({ userId, flowId });

    if (!detail) {
      return res.status(404).json({ success: false, message: "Detail tidak ditemukan" });
    }

    res.status(200).json({ success: true, detail });
  } catch (err) {
    console.error("❌ Error getFlowDetail:", err.message);
    res.status(500).json({ success: false, message: "Gagal mengambil detail flow" });
  }
};
