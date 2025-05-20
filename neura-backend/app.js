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
const chatFlowRoutes = require('./routes/chatFlowRoutes'); // ⬅️ ✅ Tambahan baru
const chatflowDetailRoutes = require('./routes/chatflowDetailRoute'); // ⬅️ untuk wizard


app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chatflow', chatFlowRoutes); // ⬅️ ✅ Daftarkan rute chatflow
app.use('/api/chatflow', chatflowDetailRoutes); // ⬅️ endpoint wizard


// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
