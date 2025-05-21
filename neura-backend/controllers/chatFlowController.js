// controllers/chatFlowController.js
const ChatFlow = require("../models/ChatFlow");

// ✅ Ambil semua flow milik user
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
      isActive: false, // default flow tidak aktif
    });
    res.status(201).json(newFlow);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat chatflow" });
  }
};

// ✅ Aktifkan salah satu flow (dan nonaktifkan lainnya)
exports.activateChatFlow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Nonaktifkan semua flow milik user
    await ChatFlow.updateMany({ userId }, { isActive: false });

    // Aktifkan flow yang dipilih
    const updatedFlow = await ChatFlow.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!updatedFlow) {
      return res.status(404).json({ message: "Flow tidak ditemukan" });
    }

    res.json(updatedFlow);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengaktifkan flow" });
  }
};

// ✅ (Opsional) Hapus flow
exports.deleteChatFlow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await ChatFlow.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Flow tidak ditemukan" });
    }

    res.json({ message: "Flow berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus flow" });
  }
};
