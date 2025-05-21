import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlockFormFAQ from "../components/builder/BlockFormFAQ";
import BlockFormMenu from "../components/builder/BlockFormMenu";
import BlockFormForm from "../components/builder/BlockFormForm";
import BlockFormNotif from "../components/builder/BlockFormNotif";

export default function BuilderPage() {
  const { flowId } = useParams();
  const [blocks, setBlocks] = useState([]);

  // ✅ Ambil histori blok saat halaman dibuka
  useEffect(() => {
    const fetchBlocks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/chatflow/${flowId}/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.detail && data.detail.blocks) {
            setBlocks(data.detail.blocks);
          }
        }
      } catch (err) {
        console.error("❌ Gagal mengambil data blok:", err.message);
      }
    };
    fetchBlocks();
  }, [flowId]);

  const addBlock = (newBlock) => {
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (index, updatedBlock) => {
    const updated = [...blocks];
    updated[index] = updatedBlock;
    setBlocks(updated);
  };

  const submitFlow = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Token tidak ditemukan. Silakan login ulang.");

    try {
      const res = await fetch(`http://localhost:5000/api/chatflow/${flowId}/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blocks }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan flow.");
      const data = await res.json();
      console.log("✅ Flow disimpan:", data);
      alert("Flow berhasil disimpan!");
    } catch (err) {
      console.error("❌ Error submit flow:", err.message);
      alert("Gagal menyimpan flow. Cek koneksi atau token.");
    }
  };

  const renderForm = (block, index) => {
    const sharedProps = {
      block,
      onChange: (updated) => updateBlock(index, updated),
    };

    switch (block.type) {
      case "FAQ":
        return <BlockFormFAQ key={index} {...sharedProps} />;
      case "MENU":
        return <BlockFormMenu key={index} {...sharedProps} />;
      case "FORM":
        return <BlockFormForm key={index} {...sharedProps} />;
      case "NOTIF":
        return <BlockFormNotif key={index} {...sharedProps} />;
      default:
        return <p key={index}>Blok tidak dikenali</p>;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Buat Alur Chatbot</h1>

      <div className="space-y-4 mb-6">
        <p className="text-lg">Tambah blok baru:</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addBlock({ type: "FAQ", question: "", answer: "" })} className="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah FAQ
          </button>
          <button onClick={() => addBlock({ type: "MENU", items: [] })} className="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah Menu
          </button>
          <button onClick={() => addBlock({ type: "FORM", fields: [] })} className="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah Formulir
          </button>
          <button onClick={() => addBlock({ type: "NOTIF", answer: "" })} className="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah Notifikasi
          </button>
        </div>
      </div>

      {blocks.length > 0 && (
        <div className="space-y-6">
          <p className="text-lg font-semibold">Isi Blok:</p>
          {blocks.map((block, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2">Blok {index + 1}: {block.type}</h2>
              {renderForm(block, index)}
            </div>
          ))}

          <button
            onClick={submitFlow}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            💾 Simpan & Aktifkan
          </button>
        </div>
      )}
    </div>
  );
}
