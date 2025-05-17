// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = []; // simpan sementara di memory (nanti diganti ke database)

exports.register = async (req, res) => {
  const { email, password, businessName, whatsapp } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: 'Email sudah terdaftar' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed, businessName, whatsapp };
  users.push(user);

  res.json({ message: 'Registrasi berhasil', userId: user.id });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Email tidak ditemukan' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Password salah' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
