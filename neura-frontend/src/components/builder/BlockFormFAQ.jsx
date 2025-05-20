import React from "react";

export default function BlockFormFAQ({ block, onChange }) {
  return (
    <div className="space-y-2">
      <label>Pertanyaan</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={block.question}
        onChange={(e) => onChange({ ...block, question: e.target.value })}
      />
      <label>Jawaban</label>
      <textarea
        className="w-full border p-2 rounded"
        value={block.answer}
        onChange={(e) => onChange({ ...block, answer: e.target.value })}
      />
    </div>
  );
}
