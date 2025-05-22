const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB(); // ⬅️ Jalankan koneksi MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Routes
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const chatFlowRoutes = require('./routes/chatFlowRoutes'); // ⬅️ Chatflow utama
const chatflowDetailRoutes = require('./routes/chatflowDetailRoute'); // ⬅️ Wizard builder
const faqRoutes = require('./routes/faq'); // ✅ Tambahkan ini

// 🌐 Gunakan route
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chatflow', chatFlowRoutes);
app.use('/api/chatflow', chatflowDetailRoutes);
app.use('/api/faq', faqRoutes); // ✅ Aktifkan route untuk AI suggest-alias

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
