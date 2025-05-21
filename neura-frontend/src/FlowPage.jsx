import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlowPage() {
  const [flows, setFlows] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchFlows = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/chatflow", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setFlows(data);
  };

  const addFlow = async () => {
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
    setFlows([data, ...flows]);
    setName("");
  };

  const activateFlow = async (flowId) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/chatflow/${flowId}/activate`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFlows(); // Refresh ulang agar status "aktif" terlihat
  };

  const deleteFlow = async (flowId) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/chatflow/${flowId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setFlows(flows.filter((f) => f._id !== flowId));
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Daftar Chat Flow</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Flow"
        className="border p-2 mr-2"
      />
      <button onClick={addFlow} className="bg-blue-600 text-white px-4 py-2 rounded">
        Tambah Flow Baru
      </button>

      <ul className="mt-6 space-y-3">
        {flows.map((flow) => (
          <li key={flow._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{flow.name}</p>
              {flow.isActive && <span className="text-green-600 text-sm">✅ Aktif</span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/builder/${flow._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Builder
              </button>
              <button
                onClick={() => activateFlow(flow._id)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Aktifkan
              </button>
              <button
                onClick={() => deleteFlow(flow._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
