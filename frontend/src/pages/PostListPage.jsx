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

  // Fetch stats for header cards
  useEffect(() => {
    postApi.getStats().then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  // Re-fetch when filters change
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
            icon={<BookOpen size={20} />}
            label="Total Posts"
            value={stats.totalPosts}
            color="hsl(var(--primary))"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Published"
            value={stats.byStatus?.published || 0}
            color="hsl(var(--status-published))"
          />
          <StatCard
            icon={<FileText size={20} />}
            label="Drafts"
            value={stats.byStatus?.draft || 0}
            color="hsl(var(--status-draft))"
          />
          <StatCard
            icon={<BarChart2 size={20} />}
            label="Archived"
            value={stats.byStatus?.archived || 0}
            color="hsl(var(--status-archived))"
          />
        </div>
      )}

      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
            Blog Posts
          </h1>
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
            Manage your blog posts — create, edit, and organize content.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button
            id="export-csv-btn"
            className="btn-ghost"
            onClick={handleExport}
            title="Export posts to CSV"
          >
            <Download size={15} />
            Export CSV
          </button>
          <button
            id="create-post-btn"
            className="btn-primary"
            onClick={() => navigate("/posts/new")}
          >
            <PenSquare size={15} />
            New Post
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        {/* Toolbar */}
        <div className="toolbar">
          <PostFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
          />
        </div>

        {/* Table */}
        <PostTable
          posts={posts}
          loading={loading}
          onDelete={(post) => setDeleteTarget(post)}
        />

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
      </div>
      <div style={{ fontSize: "1.875rem", fontWeight: 800, lineHeight: 1, marginBottom: "0.375rem", letterSpacing: "-0.03em" }}>
        {value}
      </div>
      <div style={{ fontSize: "0.8125rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
