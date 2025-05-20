// src/components/chat/ChatBubble.jsx
export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div
      className={`p-2 rounded w-fit max-w-xs ${
        isUser ? "bg-blue-600 text-white self-end ml-auto" : "bg-gray-200 text-gray-900 self-start"
      }`}
    >
      {text}
    </div>
  );
}
