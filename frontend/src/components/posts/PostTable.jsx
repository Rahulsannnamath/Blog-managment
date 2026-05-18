import { useNavigate } from "react-router-dom";
import {
  Eye, Pencil, Trash2, Clock, TrendingUp, FileText
} from "lucide-react";
import PostStatusBadge from "./PostStatusBadge";
import { formatDate, truncate } from "@/utils/helpers";

function SkeletonRow() {
  return (
    <tr>
      {[...Array(7)].map((_, i) => (
        <td key={i} style={{ padding: "1rem" }}>
          <div className="skeleton" style={{ height: 16, borderRadius: 6 }} />
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
        <FileText size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          No posts found
        </h3>
        <p style={{ fontSize: "0.875rem" }}>
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
                <Eye size={12} /> Views
              </span>
            </th>
            <th>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={12} /> Created
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
                    <span style={{ fontWeight: 500 }}>{post.author}</span>
                  </td>
                  <td>
                    <span className="badge badge-category">{post.category}</span>
                  </td>
                  <td>
                    <PostStatusBadge status={post.status} />
                  </td>
                  <td>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: "hsl(var(--muted-foreground))",
                        fontSize: "0.8125rem",
                      }}
                    >
                      <TrendingUp size={12} />
                      {post.views?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
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
                        <Eye size={14} />
                      </button>
                      <button
                        id={`edit-post-${post._id}`}
                        className="action-btn action-edit"
                        onClick={() => navigate(`/posts/${post._id}/edit`)}
                        title="Edit post"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        id={`delete-post-${post._id}`}
                        className="action-btn action-delete"
                        onClick={() => onDelete(post)}
                        title="Delete post"
                      >
                        <Trash2 size={14} />
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
          min-width: 200px;
          max-width: 300px;
        }
        .post-title-link {
          font-weight: 600;
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: color 0.15s;
          line-height: 1.4;
        }
        .post-title-link:hover { color: hsl(var(--primary)); }
        .read-time {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.7rem;
          color: hsl(var(--muted-foreground));
        }
        .action-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
        }
        .action-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--secondary));
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .action-view:hover {
          border-color: hsl(250, 84%, 67% / 0.4);
          background: hsl(250, 84%, 67% / 0.1);
          color: hsl(var(--primary));
        }
        .action-edit:hover {
          border-color: hsl(38, 92%, 50% / 0.4);
          background: hsl(38, 92%, 50% / 0.1);
          color: hsl(38, 92%, 50%);
        }
        .action-delete:hover {
          border-color: hsl(var(--destructive) / 0.4);
          background: hsl(var(--destructive) / 0.1);
          color: hsl(var(--destructive));
        }
      `}</style>
    </div>
  );
}
