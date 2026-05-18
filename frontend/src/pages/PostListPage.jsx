import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PenSquare, Download, BarChart2, BookOpen, FileText, TrendingUp } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { postApi } from "@/api/postApi";
import PostTable from "@/components/posts/PostTable";
import PostFilters from "@/components/posts/PostFilters";
import Pagination from "@/components/common/Pagination";
import ConfirmModal from "@/components/common/ConfirmModal";
import PageWrapper from "@/components/layout/PageWrapper";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export default function PostListPage() {
  const navigate = useNavigate();
  const { posts, pagination, loading, fetchPosts, deletePost, exportCSV } = usePosts();
  const [filters, setFilters] = useState({ search: "", category: "", status: "", page: 1, limit: DEFAULT_PAGE_SIZE });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    postApi.getStats().then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchPosts(filters);
  }, [filters, fetchPosts]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await deletePost(deleteTarget._id, () => {
      setDeleteTarget(null);
      fetchPosts(filters);
    });
    setDeleteLoading(false);
  }, [deleteTarget, deletePost, fetchPosts, filters]);

  const handleReset = useCallback(() => {
    setFilters({ search: "", category: "", status: "", page: 1, limit: DEFAULT_PAGE_SIZE });
  }, []);

  const handleExport = () => exportCSV(filters);

  return (
    <PageWrapper>
      {/* Stats row */}
      {stats && (
        <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
          <StatCard
            icon={<BookOpen size={18} />}
            label="Total Posts"
            value={stats.totalPosts}
            color="#6366f1"
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Published"
            value={stats.byStatus?.published || 0}
            color="#16a34a"
          />
          <StatCard
            icon={<FileText size={18} />}
            label="Drafts"
            value={stats.byStatus?.draft || 0}
            color="#d97706"
          />
          <StatCard
            icon={<BarChart2 size={18} />}
            label="Archived"
            value={stats.byStatus?.archived || 0}
            color="#64748b"
          />
        </div>
      )}

      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 800, marginBottom: "0.2rem", letterSpacing: "-0.02em", color: "hsl(var(--foreground))" }}>
            Blog Post Manager
          </h1>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
            Manage and organize your blog posts
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          <button
            id="export-csv-btn"
            className="btn-ghost"
            onClick={handleExport}
            title="Export posts to CSV"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            id="create-post-btn"
            className="btn-primary"
            onClick={() => navigate("/posts/new")}
          >
            <PenSquare size={14} />
            + Add Post
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        {/* Toolbar */}
        <div className="toolbar">
          <PostFilters filters={filters} onChange={setFilters} onReset={handleReset} />
        </div>

        {/* Table */}
        <PostTable posts={posts} loading={loading} onDelete={(post) => setDeleteTarget(post)} />

        {/* Pagination */}
        <Pagination
          pagination={pagination}
          onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
        />
      </div>

      {/* Delete confirm modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Post"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`
            : ""
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </PageWrapper>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
        <div
          style={{
            width: 38, height: 38,
            borderRadius: 10,
            background: `${color}14`,
            border: `1px solid ${color}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
      </div>
      <div style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1, marginBottom: "0.3rem", letterSpacing: "-0.03em", color: "hsl(var(--foreground))" }}>
        {value}
      </div>
      <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
