import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./Dashboard.jsx";
import ChatRoom from "./ChatRoom.jsx";
import FlowPage from "./FlowPage.jsx";
import BuilderPage from "./pages/BuilderPage.jsx"; // ✅ Tambahkan ini
import ProtectedRoute from "./ProtectedRoute.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/flow"
          element={
            <ProtectedRoute>
              <FlowPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder/:flowId"
          element={
            <ProtectedRoute>
              <BuilderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
