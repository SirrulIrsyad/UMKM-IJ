import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Selamat Datang di <span className="text-blue-500">Dashboard NeuraGo!</span>
      </h1>

      {user ? (
        <div className="text-center space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nama Bisnis:</strong> {user.businessName}</p>
          <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
          <button
            onClick={handleLogout}
            className="mt-6 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Memuat data pengguna...</p>
      )}
    </div>
  );
}
