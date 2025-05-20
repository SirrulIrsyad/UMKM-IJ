// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");
const { getCurrentUser } = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;
