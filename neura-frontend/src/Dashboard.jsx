import React from "react"; // ✅ Boleh tetap ada
import { useState } from "react";


export default function Dashboard() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center">
        Selamat Datang di <span className="text-blue-500">Dashboard NeuraGo!</span>
      </h1>
    </div>
  );
}
