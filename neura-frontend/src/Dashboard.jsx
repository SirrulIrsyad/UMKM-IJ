import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdBusiness, MdWhatsapp } from "react-icons/md";


export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (err) {
        console.error("Gagal fetch user:", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 relative">
      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Logout
      </button>

      {/* Konten Tengah */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Ilustrasi SVG */}
        <img
          src="/undraw_data-reports_l2u3.svg"
          alt="Ilustrasi AI"
          className="w-64 max-w-xs mb-6"
        />

        <h1 className="text-4xl font-bold mb-6 text-center">
          Selamat Datang di <span className="text-blue-600">Dashboard NeuraGo!</span>
        </h1>

       {user ? (
  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
    {/* Informasi User dalam Card Grid */}
    <div className="grid grid-cols-1 gap-4 text-left">
      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm border">
        <MdEmail className="text-blue-600 w-6 h-6 mt-1" />
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-800 break-words">{user.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm border">
        <MdBusiness className="text-purple-600 w-6 h-6 mt-1" />
        <div>
          <p className="text-sm text-gray-500">Nama Bisnis</p>
          <p className="font-medium text-gray-800">{user.businessName}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm border">
        <MdWhatsapp className="text-green-600 w-6 h-6 mt-1" />
        <div>
          <p className="text-sm text-gray-500">WhatsApp</p>
          <p className="font-medium text-gray-800">{user.whatsapp}</p>
        </div>
      </div>
    </div>

    {/* Tombol Aksi */}
    <div className="flex justify-center gap-4 pt-4">
      <button
        onClick={() => navigate("/chat")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
      >
        Buka Chatbot
      </button>
      <button
        onClick={() => navigate("/flow")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
      >
        Kelola ChatFlow
      </button>
    </div>
  </div>
) : (
  <p>Memuat data pengguna...</p>
)}

      </div>
    </div>
  );
}
