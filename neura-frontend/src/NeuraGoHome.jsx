import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NeuraGoHome() {const navigate = useNavigate(); 
  // 🔐 Data & handler register
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    businessName: "",
    whatsapp: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
      } else {
        alert(data.message || "Registrasi gagal.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  // 🔑 Data & handler login
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login berhasil!");
        navigate("/dashboard"); // ⬅️ Redirect ke dashboard
      } else {
        alert(data.message || "Login gagal.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">NeuraGo</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:underline">Fitur</a>
          <a href="#solutions" className="hover:underline">Solusi</a>
          <a href="#about" className="hover:underline">Tentang</a>
          <a href="#login" className="hover:underline">Masuk</a>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-5xl font-bold mb-6 max-w-3xl">
          Mendorong UMKM dengan Kecerdasan Buatan
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mb-8">
          NeuraGo membantu bisnis kecil terhubung dengan pelanggan melalui chatbot cerdas dan layanan otomatisasi modern.
        </p>
        <button className="text-black font-semibold bg-white hover:bg-gray-200 px-4 py-2 rounded">Mulai Sekarang</button>
      </main>

      <section id="features" className="px-6 py-16 border-t border-gray-800">
        <h3 className="text-3xl font-bold mb-8 text-center">Fitur Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">Chatbot Modular</h4>
            <p className="text-gray-400">Sesuaikan alur percakapan sesuai kebutuhan UMKM-mu.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Integrasi WhatsApp</h4>
            <p className="text-gray-400">Langsung terhubung dengan pelanggan dari aplikasi favorit mereka.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Analitik Pintar</h4>
            <p className="text-gray-400">Lihat wawasan pengguna untuk membuat keputusan yang lebih baik.</p>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-16 border-t border-gray-800 bg-gray-900">
        <h3 className="text-3xl font-bold mb-6 text-center">Tentang NeuraGo</h3>
        <p className="max-w-3xl text-center text-gray-400 mx-auto">
          NeuraGo adalah platform AI lokal yang mendukung UMKM di Indonesia agar bisa bersaing di era digital.
          Dengan fitur chatbot canggih dan integrasi mudah, NeuraGo hadir sebagai solusi yang terjangkau dan scalable.
        </p>
      </section>

      <section id="register" className="px-6 py-16 border-t border-gray-800 bg-gray-950">
        <h3 className="text-3xl font-bold mb-6 text-center">Daftar Akun UMKM</h3>
        <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="you@example.com"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Kata Sandi</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Nama Bisnis</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Warung Maknyus"
              value={registerData.businessName}
              onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Nomor WhatsApp</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="0812-XXXX-XXXX"
              value={registerData.whatsapp}
              onChange={(e) => setRegisterData({ ...registerData, whatsapp: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-gray-200 py-2 rounded">
            Daftar Sekarang
          </button>
        </form>
      </section>

      <section id="login" className="px-6 py-16 border-t border-gray-800 bg-gray-950">
        <h3 className="text-3xl font-bold mb-6 text-center">Masuk ke Akun Anda</h3>
        <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Kata Sandi</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full text-black font-semibold bg-white hover:bg-gray-200 py-2 rounded">
            Masuk
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Belum punya akun? <a href="#register" className="underline">Daftar</a>
        </p>
      </section>

      <footer className="px-6 py-6 text-sm text-gray-500 border-t border-gray-800 text-center">
        &copy; 2025 NeuraGo. Dibuat dengan ❤️ oleh Irsyad dan Juan.
      </footer>
    </div>
  );
}
