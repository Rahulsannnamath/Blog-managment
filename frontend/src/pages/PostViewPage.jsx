import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Pencil, Trash2, Clock, Eye, Heart,
  Calendar, Tag, User, Layers, Loader2, BookOpen, Share2
} from "lucide-react";
import toast from "react-hot-toast";
import { postApi } from "@/api/postApi";
import PostStatusBadge from "@/components/posts/PostStatusBadge";
import ConfirmModal from "@/components/common/ConfirmModal";
import PageWrapper from "@/components/layout/PageWrapper";
import { formatDateFull, timeAgo } from "@/utils/helpers";

export default function PostViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    postApi
      .getById(id)
      .then((res) => setPost(res.data.data))
      .catch((err) => {
        toast.error(err.message || "Post not found");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await postApi.delete(id);
      toast.success("Post deleted!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
          <Loader2 size={36} style={{ color: "hsl(var(--primary))", animation: "spin 1s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </PageWrapper>
    );
  }

  if (!post) return null;

  return (
    <PageWrapper>
      {/* Navigation bar */}
      <div className="view-nav">
        <button className="btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} />
          Back
        </button>
        <div className="view-nav-actions">
          <button
            id="share-post-btn"
            className="btn-ghost"
            onClick={handleShare}
            title="Copy link"
          >
            <Share2 size={15} />
            Share
          </button>
          <button
            id="edit-post-view-btn"
            className="btn-ghost"
            onClick={() => navigate(`/posts/${id}/edit`)}
          >
            <Pencil size={15} />
            Edit
          </button>
          <button
            id="delete-post-view-btn"
            className="btn-danger"
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>

      <div className="view-layout">
        {/* Main content */}
        <article className="view-article">
          {/* Cover image */}
          {post.coverImage && (
            <div className="cover-img-wrapper">
              <img
                src={post.coverImage}
                alt={post.title}
                className="cover-img"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Header */}
          <div className="article-header">
            <div className="article-meta-top">
              <span className="badge badge-category">{post.category}</span>
              <PostStatusBadge status={post.status} />
            </div>

            <h1 className="article-title">{post.title}</h1>

            {post.excerpt && (
              <p className="article-excerpt">{post.excerpt}</p>
            )}

            {/* Author + date row */}
            <div className="article-byline">
              <div className="byline-author">
                <div className="author-avatar">
                  {post.author?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{post.author}</div>
                  <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                    {timeAgo(post.createdAt)}
                  </div>
                </div>
              </div>
              <div className="byline-stats">
                {post.readTime && (
                  <span className="byline-stat">
                    <Clock size={13} /> {post.readTime} min read
                  </span>
                )}
                <span className="byline-stat">
                  <Eye size={13} /> {post.views?.toLocaleString()} views
                </span>
                <span className="byline-stat">
                  <Heart size={13} /> {post.likes?.toLocaleString()} likes
                </span>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="article-divider" />
          <div className="article-body">
            {post.content.split("\n").map((para, i) =>
              para.trim() ? (
                <p key={i} style={{ marginBottom: "1rem", lineHeight: 1.8, color: "hsl(var(--foreground) / 0.9)" }}>
                  {para}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="article-tags">
              <Tag size={14} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
              {post.tags.map((tag) => (
                <span key={tag} className="tag-item">{tag}</span>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="view-sidebar">
          {/* Post info card */}
          <div className="glass-card sidebar-card">
            <h3 className="sidebar-title">
              <BookOpen size={15} /> Post Details
            </h3>
            <div className="divider" />
            <div className="sidebar-items">
              <SidebarItem icon={<User size={14} />} label="Author" value={post.author} />
              <SidebarItem icon={<Layers size={14} />} label="Category" value={post.category} />
              <SidebarItem icon={<Calendar size={14} />} label="Published" value={formatDateFull(post.createdAt)} />
              <SidebarItem icon={<Calendar size={14} />} label="Updated" value={formatDateFull(post.updatedAt)} />
              <SidebarItem icon={<Eye size={14} />} label="Views" value={post.views?.toLocaleString()} />
              <SidebarItem icon={<Heart size={14} />} label="Likes" value={post.likes?.toLocaleString()} />
              {post.readTime && (
                <SidebarItem icon={<Clock size={14} />} label="Read Time" value={`${post.readTime} minutes`} />
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass-card sidebar-card">
            <h3 className="sidebar-title">Quick Actions</h3>
            <div className="divider" />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                className="btn-ghost"
                style={{ justifyContent: "flex-start" }}
                onClick={() => navigate(`/posts/${id}/edit`)}
              >
                <Pencil size={14} /> Edit Post
              </button>
              <button
                className="btn-ghost"
                style={{ justifyContent: "flex-start" }}
                onClick={handleShare}
              >
                <Share2 size={14} /> Copy Link
              </button>
              <button
                className="btn-danger"
                style={{ justifyContent: "flex-start" }}
                onClick={() => setShowDelete(true)}
              >
                <Trash2 size={14} /> Delete Post
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Delete modal */}
      <ConfirmModal
        isOpen={showDelete}
        title="Delete Post"
        message={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleteLoading}
      />

      <style>{`
        .view-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .view-nav-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .view-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1.5rem;
          align-items: start;
        }
        .view-article {
          background: var(--gradient-card);
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          overflow: hidden;
          min-width: 0;
        }
        .cover-img-wrapper {
          width: 100%;
          aspect-ratio: 16/5;
          overflow: hidden;
          background: hsl(var(--secondary));
        }
        .cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .article-header {
          padding: 2rem 2rem 1.5rem;
        }
        .article-meta-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .article-title {
          font-size: 1.875rem;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.03em;
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }
        .article-excerpt {
          font-size: 1.0625rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.65;
          margin-bottom: 1.25rem;
          font-style: italic;
        }
        .article-byline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .byline-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .byline-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .byline-stat {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8125rem;
          color: hsl(var(--muted-foreground));
        }
        .article-divider {
          height: 1px;
          background: hsl(var(--border));
          margin: 0 2rem;
        }
        .article-body {
          padding: 1.75rem 2rem;
          font-size: 1.0625rem;
        }
        .article-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 1.25rem 2rem 2rem;
          border-top: 1px solid hsl(var(--border));
        }
        .sidebar-card {
          padding: 1.25rem;
          margin-bottom: 1rem;
        }
        .sidebar-title {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--muted-foreground));
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .sidebar-items {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        /* ── xl (≤1100px): shrink sidebar ── */
        @media (max-width: 1100px) {
          .view-layout { grid-template-columns: 1fr 260px; gap: 1.25rem; }
        }

        /* ── lg (≤900px): sidebar goes below, visible ── */
        @media (max-width: 900px) {
          .view-layout { grid-template-columns: 1fr; }
          .view-sidebar { order: 1; }
          .article-title { font-size: 1.5rem; }
          .article-header, .article-body { padding-left: 1.5rem; padding-right: 1.5rem; }
          .article-divider { margin: 0 1.5rem; }
          .article-tags { padding: 1rem 1.5rem; }
        }

        /* ── md (≤640px) ── */
        @media (max-width: 640px) {
          .view-nav { margin-bottom: 1rem; }
          .article-title { font-size: 1.3rem; }
          .article-header, .article-body { padding-left: 1.125rem; padding-right: 1.125rem; }
          .article-divider { margin: 0 1.125rem; }
          .article-tags { padding: 0.875rem 1.125rem 1.25rem; }
          .article-excerpt { font-size: 0.9375rem; }
          .article-body { font-size: 0.9375rem; }
          .sidebar-card { padding: 1rem; }
        }

        /* ── sm (≤480px) ── */
        @media (max-width: 480px) {
          .view-nav { flex-direction: column; align-items: flex-start; }
          .view-nav-actions { width: 100%; }
          .view-nav-actions button { flex: 1; justify-content: center; }
          .article-title { font-size: 1.175rem; }
          .article-header { padding: 1.125rem 1rem 1rem; }
          .article-body { padding: 1rem; font-size: 0.9rem; }
          .article-divider { margin: 0 1rem; }
          .article-tags { padding: 0.75rem 1rem 1.125rem; }
          .byline-stats { display: none; }
          .author-avatar { width: 34px; height: 34px; font-size: 0.875rem; }
        }

        /* ── xs (≤360px) ── */
        @media (max-width: 360px) {
          .article-title { font-size: 1.075rem; }
          .article-header { padding: 0.875rem 0.75rem 0.875rem; }
          .article-body { padding: 0.875rem 0.75rem; font-size: 0.875rem; }
          .article-divider { margin: 0 0.75rem; }
          .article-tags { padding: 0.625rem 0.75rem 1rem; }
          .sidebar-card { padding: 0.875rem; }
          .cover-img-wrapper { aspect-ratio: 16/6; }
        }
      `}</style>
    </PageWrapper>
  );
}

function SidebarItem({ icon, label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "hsl(var(--muted-foreground))",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        {icon} {label}
      </span>
      <span style={{ fontSize: "0.875rem", color: "hsl(var(--foreground) / 0.9)", fontWeight: 500 }}>
        {value || "—"}
      </span>
    </div>
  );
}
