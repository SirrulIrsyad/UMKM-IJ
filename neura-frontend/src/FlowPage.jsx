// src/pages/FlowPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlowPage() {
  const [flows, setFlows] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔄 Ambil semua flow milik user
  const fetchFlows = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/chatflow", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFlows(data);
    } catch (err) {
      console.error("Gagal ambil flow:", err.message);
    }
  };

  // ➕ Tambah flow baru
  const addFlow = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/chatflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setFlows([...flows, data]);
      setName("");
    } catch (err) {
      console.error("Gagal tambah flow:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Chat Flow</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Flow Baru"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={addFlow}
          disabled={!name.trim() || loading}
          className={`px-4 py-2 rounded text-white ${
            !name.trim() || loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          }`}
        >
          {loading ? "Membuat..." : "Tambah Flow Baru"}
        </button>
      </div>

      <ul className="space-y-2">
        {flows.map((flow) => (
          <li
            key={flow._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span className="font-medium">{flow.name}</span>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              onClick={() => navigate(`/builder/${flow._id}`)}
            >
              Builder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
