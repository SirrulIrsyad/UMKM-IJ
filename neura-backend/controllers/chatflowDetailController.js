const ChatflowDetail = require("../models/ChatflowDetail");

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
    res.json({ success: true, detail });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFlowDetail = async (req, res) => {
  const { flowId } = req.params;
  const userId = req.user.id;

  try {
    const detail = await ChatflowDetail.findOne({ userId, flowId });
    res.json({ success: true, detail });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
