import { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef(null);

  // Ambil pesan dari backend
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

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  // Kirim pesan
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setTimeout(() => {
        const botReply = { sender: "bot", text: data.reply, _id: data._id };
        setMessages((prev) => [...prev, botReply]);
        setIsBotTyping(false);
      }, 1200);
    } catch (err) {
      const errorReply = { sender: "bot", text: "Gagal mengirim pesan ke server." };
      setMessages((prev) => [...prev, errorReply]);
      setIsBotTyping(false);
    }
  };

  // Hapus satu pesan
  const handleDelete = async (messageId) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5000/api/chat/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (err) {
      console.error("Gagal menghapus pesan:", err);
    }
  };

  // Reset semua pesan
  const handleReset = async () => {
    const confirmDelete = window.confirm("Yakin ingin menghapus semua pesan?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:5000/api/chat", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages([]);
    } catch (err) {
      console.error("Gagal reset chat:", err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <header className="bg-blue-600 text-white py-4 px-6 shadow flex justify-between items-center text-xl font-semibold">
          <span>🤖 Chatbot NeuraGo</span>
          <button
            onClick={handleReset}
            className="text-sm bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition"
          >
            Reset Chat
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-3 bg-white">
          {messages.map((msg, idx) => (
            <ChatBubble
              key={msg._id || idx}
              sender={msg.sender}
              text={msg.text}
              onDelete={() => handleDelete(msg._id)}
            />
          ))}

          {isBotTyping && (
            <div className="text-sm text-gray-500 italic px-2">
              🤖 NeuraGo sedang mengetik...
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        {/* Input Form */}
        <form
          onSubmit={handleSend}
          className="px-4 py-4 bg-white border-t border-gray-200 flex items-center gap-3"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-full shadow text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
