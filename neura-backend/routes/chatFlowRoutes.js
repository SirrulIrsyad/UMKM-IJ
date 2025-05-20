const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const chatFlowController = require("../controllers/chatFlowController")

router.get("/", authMiddleware, chatFlowController.getUserChatFlows);
router.post("/", authMiddleware, chatFlowController.createChatFlow);

// kamu bisa tambah route lain nanti seperti edit/hapus

module.exports = router;
