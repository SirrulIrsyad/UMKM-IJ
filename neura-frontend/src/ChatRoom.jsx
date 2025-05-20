import { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null); // ✅ DI DALAM fungsi komponen

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Gagal mengambil pesan:", err);
      }
    };

    fetchMessages();
  }, []);

  // ✅ Auto-scroll ke bawah jika messages berubah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const newMessages = [
        { sender: "user", text: input },
        { sender: "bot", text: data.reply },
      ];
      setMessages((prev) => [...prev, ...newMessages]);
      setInput("");
    } catch (err) {
      const errorReply = { sender: "bot", text: "Gagal mengirim pesan ke server." };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-white flex flex-col">
      <h1 className="text-2xl font-bold text-center my-4 text-gray-900">Chatbot NeuraGo</h1>

      <div className="flex-1 overflow-y-auto border border-gray-300 rounded p-4 space-y-2 flex flex-col bg-gray-50">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          className="flex-1 p-2 rounded-l border border-gray-300 text-gray-900"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 rounded-r text-white hover:bg-blue-700"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
