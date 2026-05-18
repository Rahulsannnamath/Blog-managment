import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { postApi } from "@/api/postApi";
import PostForm from "@/components/posts/PostForm";
import PageWrapper from "@/components/layout/PageWrapper";
import toast from "react-hot-toast";

export default function PostFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    postApi
      .getById(id)
      .then((res) => setPost(res.data.data))
      .catch((err) => {
        toast.error(err.message || "Failed to load post");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate]);

  return (
    <PageWrapper>
      {/* Back navigation */}
      <button
        className="btn-ghost back-btn"
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1.25rem" }}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* Page title */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
          {isEdit ? "Edit Post" : "Create New Post"}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
          {isEdit
            ? "Update the post details below."
            : "Fill in the details below to publish your new blog post."}
        </p>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <Loader2 size={32} className="spin" style={{ color: "hsl(var(--primary))", opacity: 0.6 }} />
          <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <PostForm post={post} />
      )}
    </PageWrapper>
  );
}
