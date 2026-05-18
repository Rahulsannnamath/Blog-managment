import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import PostListPage from "@/pages/PostListPage";
import PostFormPage from "@/pages/PostFormPage";
import PostViewPage from "@/pages/PostViewPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/posts/new" element={<PostFormPage />} />
          <Route path="/posts/:id" element={<PostViewPage />} />
          <Route path="/posts/:id/edit" element={<PostFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#1e293b",
            border: "1px solid #e2e8f0",
            borderRadius: "0.625rem",
            fontSize: "0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "white" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "white" },
          },
        }}
      />
    </BrowserRouter>
  );
}
