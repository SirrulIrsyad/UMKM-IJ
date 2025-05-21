import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NeuraGoHome() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    businessName: "",
    whatsapp: ""
  });

  const [isButtonPressed, setIsButtonPressed] = useState(false);

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
        navigate("/dashboard");
      } else {
        alert(data.message || "Login gagal.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const handleMulaiClick = () => {
    setIsButtonPressed(true);
    const daftarSection = document.getElementById("register");
    if (daftarSection) {
      daftarSection.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setIsButtonPressed(false);
    }, 200);
  };

  const handleSudahPunyaAkunClick = () => {
    const loginSection = document.getElementById("login");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col font-sans overflow-x-hidden w-full">
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-700 cursor-pointer select-none">NeuraGo</h1>
        <nav className="space-x-8 text-lg font-medium text-gray-700">
          <a href="#features" className="hover:text-blue-700 transition duration-300 ease-in-out">Fitur</a>
          <a href="#solutions" className="hover:text-blue-700 transition duration-300 ease-in-out">Solusi</a>
          <a href="#about" className="hover:text-blue-700 transition duration-300 ease-in-out">Tentang</a>
          <a href="#login" className="hover:text-blue-700 transition duration-300 ease-in-out">Masuk</a>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 py-32 flex-1 w-full">
        <h2 className="text-6xl font-extrabold mb-8 leading-tight max-w-4xl text-blue-800">
          Mendorong UMKM dengan Kecerdasan Buatan
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mb-12">
          NeuraGo membantu bisnis kecil terhubung dengan pelanggan melalui chatbot cerdas dan layanan otomatisasi modern.
        </p>
        <button
          onClick={handleMulaiClick}
          onMouseDown={() => setIsButtonPressed(true)}
          onMouseUp={() => setIsButtonPressed(false)}
          onMouseLeave={() => setIsButtonPressed(false)}
          className={`bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ${
            isButtonPressed ? "button-pressed" : ""
          }`}
        >
          Mulai Sekarang
        </button>
      </main>

      <section id="features" className="px-8 py-20 border-t border-gray-200 w-full rounded-lg shadow-md">
        <h3 className="text-4xl font-extrabold mb-12 text-center text-blue-700">Fitur Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 border rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out">
            <svg className="mx-auto mb-6 w-14 h-14 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M9 20h6M9 12h6M9 8h6M9 4h6"></path></svg>
            <h4 className="text-2xl font-semibold mb-3">Chatbot Modular</h4>
            <p className="text-gray-600">Sesuaikan alur percakapan sesuai kebutuhan UMKM-mu.</p>
          </div>
          <div className="p-8 border rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out">
            <svg className="mx-auto mb-6 w-14 h-14 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M3 18h18M3 6h18"></path></svg>
            <h4 className="text-2xl font-semibold mb-3">Integrasi WhatsApp</h4>
            <p className="text-gray-600">Langsung terhubung dengan pelanggan dari aplikasi favorit mereka.</p>
          </div>
          <div className="p-8 border rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out">
            <svg className="mx-auto mb-6 w-14 h-14 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h1"></path></svg>
            <h4 className="text-2xl font-semibold mb-3">Analitik Pintar</h4>
            <p className="text-gray-600">Lihat wawasan pengguna untuk membuat keputusan yang lebih baik.</p>
          </div>
        </div>
      </section>

      <section id="register" className="px-8 py-20 border-t border-gray-200 w-full rounded-lg shadow-md bg-white">
        <h3 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Daftar Akun UMKM</h3>
        <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Kata Sandi</label>
            <input
              type="password"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Bisnis</label>
            <input
              type="text"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Bisnis Anda"
              value={registerData.businessName}
              onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Nomor WhatsApp</label>
            <input
              type="tel"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+628123456789"
              value={registerData.whatsapp}
              onChange={(e) => setRegisterData({ ...registerData, whatsapp: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300" >
            Daftar
          </button>
          <button
            type="button"
            onClick={handleSudahPunyaAkunClick}
            className="w-full mt-4 text-blue-700 font-semibold underline hover:text-blue-900 transition duration-300"
          >
            Sudah punya akun?
          </button>
        </form>
      </section>

      <section id="login" className="px-8 py-20 w-full rounded-lg shadow-md bg-white">
        <h3 className="text-4xl font-extrabold mb-8 text-center text-blue-700">Masuk Akun</h3>
        <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Kata Sandi</label>
            <input
              type="password"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Masuk
          </button>
        </form>
      </section>

      <footer className="border-t border-gray-200 text-center py-6 mt-20 text-gray-600 text-sm w-full">
        &copy; 2025 NeuraGo. Semua hak cipta dilindungi.
      </footer>
    </div>
  );
}
