// models/ChatFlow.js
const mongoose = require("mongoose");

const chatFlowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  nodes: { type: Array, default: [] } // bisa kita isi nanti dengan struktur alur chatbot
}, { timestamps: true });

module.exports = mongoose.model("ChatFlow", chatFlowSchema);
