const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 📌 Register
exports.register = async (req, res) => {
  const { email, password, businessName, whatsapp } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const user = await User.create({
      email,
      password: hashedPassword,
      businessName,
      whatsapp,
    });

    res.json({ message: "Registrasi berhasil", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
};

// 📌 Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    // Cek kecocokan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Buat token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        businessName: user.businessName,
        whatsapp: user.whatsapp,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

// 📌 Ambil data user dari token
exports.getCurrentUser = (req, res) => {
  res.json(req.user);
};
