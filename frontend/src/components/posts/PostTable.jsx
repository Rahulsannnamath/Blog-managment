import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Clock, TrendingUp, FileText } from "lucide-react";
import PostStatusBadge from "./PostStatusBadge";
import { formatDate, truncate } from "@/utils/helpers";

function SkeletonRow() {
  return (
    <tr>
      {[...Array(7)].map((_, i) => (
        <td key={i} style={{ padding: "0.9rem 1rem" }}>
          <div className="skeleton" style={{ height: 14, borderRadius: 4 }} />
        </td>
      ))}
    </tr>
  );
}

export default function PostTable({ posts, loading, onDelete }) {
  const navigate = useNavigate();

  if (!loading && posts.length === 0) {
    return (
      <div className="empty-state">
        <FileText size={44} style={{ opacity: 0.18, marginBottom: "1rem", color: "hsl(var(--muted-foreground))" }} />
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem", color: "hsl(var(--foreground))" }}>
          No posts found
        </h3>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
          Try adjusting your filters or create a new post.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <TrendingUp size={11} /> Views
              </span>
            </th>
            <th>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} /> Created
              </span>
            </th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            : posts.map((post) => (
                <tr key={post._id} className="table-row">
                  <td>
                    <div className="post-title-cell">
                      <span
                        className="post-title-link"
                        onClick={() => navigate(`/posts/${post._id}`)}
                        title={post.title}
                      >
                        {truncate(post.title, 55)}
                      </span>
                      {post.readTime && (
                        <span className="read-time">
                          <Clock size={10} /> {post.readTime} min read
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>{post.author}</span>
                  </td>
                  <td>
                    <span className="badge badge-category">{post.category}</span>
                  </td>
                  <td>
                    <PostStatusBadge status={post.status} />
                  </td>
                  <td>
                    <span className="views-cell">
                      <TrendingUp size={12} />
                      {post.views?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className="date-cell">
                    {formatDate(post.createdAt)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        id={`view-post-${post._id}`}
                        className="action-btn action-view"
                        onClick={() => navigate(`/posts/${post._id}`)}
                        title="View post"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        id={`edit-post-${post._id}`}
                        className="action-btn action-edit"
                        onClick={() => navigate(`/posts/${post._id}/edit`)}
                        title="Edit post"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        id={`delete-post-${post._id}`}
                        className="action-btn action-delete"
                        onClick={() => onDelete(post)}
                        title="Delete post"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <style>{`
        .table-row { cursor: default; }
        .post-title-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 160px;
          max-width: 280px;
        }
        .post-title-link {
          font-weight: 600;
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: color 0.14s;
          line-height: 1.4;
          font-size: 0.875rem;
        }
        .post-title-link:hover { color: hsl(var(--primary)); }
        .read-time {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.68rem;
          color: hsl(var(--muted-foreground));
        }
        .views-cell {
          display: flex;
          align-items: center;
          gap: 4px;
          color: hsl(var(--muted-foreground));
          font-size: 0.8125rem;
        }
        .date-cell {
          color: hsl(var(--muted-foreground));
          font-size: 0.8125rem;
          white-space: nowrap;
        }
        .action-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
        }
        .action-btn {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          border: 1px solid hsl(var(--border));
          background: white;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.14s ease;
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.05);
          flex-shrink: 0;
        }
        .action-view:hover {
          border-color: hsl(var(--primary) / 0.35);
          background: hsl(var(--primary) / 0.07);
          color: hsl(var(--primary));
        }
        .action-edit:hover {
          border-color: hsl(38 92% 46% / 0.35);
          background: hsl(38 92% 46% / 0.08);
          color: hsl(38 80% 36%);
        }
        .action-delete:hover {
          border-color: hsl(var(--destructive) / 0.35);
          background: hsl(var(--destructive) / 0.07);
          color: hsl(var(--destructive));
        }

        /* ── lg: hide Views ── */
        @media (max-width: 900px) {
          .data-table th:nth-child(5),
          .data-table td:nth-child(5) { display: none; }
        }

        /* ── md: hide Category + date cell font shrinks ── */
        @media (max-width: 720px) {
          .data-table th:nth-child(3),
          .data-table td:nth-child(3) { display: none; }
          .post-title-cell { min-width: 130px; max-width: 220px; }
          .data-table th, .data-table td { padding: 0.75rem 0.75rem; }
        }

        /* ── sm: hide Created date ── */
        @media (max-width: 560px) {
          .data-table th:nth-child(6),
          .data-table td:nth-child(6) { display: none; }
          .post-title-cell { min-width: 110px; max-width: 180px; }
          .read-time { display: none; }
          .action-btn { width: 28px; height: 28px; }
          .data-table th, .data-table td { padding: 0.65rem 0.6rem; }
        }

        /* ── xs: hide Author too, compact everything ── */
        @media (max-width: 400px) {
          .data-table th:nth-child(2),
          .data-table td:nth-child(2) { display: none; }
          .post-title-cell { min-width: 90px; max-width: 150px; }
          .post-title-link { font-size: 0.8125rem; }
          .data-table th, .data-table td { padding: 0.6rem 0.5rem; }
          .action-btn { width: 26px; height: 26px; border-radius: 6px; }
        }
      `}</style>
    </div>
  );
}
