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
            background: "hsl(222, 47%, 11%)",
            color: "hsl(213, 31%, 91%)",
            border: "1px solid hsl(222, 40%, 18%)",
            borderRadius: "0.625rem",
            fontSize: "0.875rem",
            boxShadow: "0 8px 24px hsl(0 0% 0% / 0.4)",
          },
          success: {
            iconTheme: { primary: "hsl(142, 76%, 36%)", secondary: "white" },
          },
          error: {
            iconTheme: { primary: "hsl(0, 72%, 51%)", secondary: "white" },
          },
        }}
      />
    </BrowserRouter>
  );
}
