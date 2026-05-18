import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages, total, limit } = pagination;

  if (totalPages <= 1) return null;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Build page numbers to show
  const pages = [];
  const delta = 2;
  const left = Math.max(1, page - delta);
  const right = Math.min(totalPages, page + delta);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("...");
  }
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages) {
    if (right < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="pagination-bar">
      <span className="pagination-info">
        Showing <strong>{startItem}–{endItem}</strong> of <strong>{total}</strong> posts
      </span>

      <div className="pagination-controls">
        <button
          id="pagination-prev"
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              id={`page-${p}`}
              className={`page-btn ${page === p ? "page-btn-active" : ""}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          id="pagination-next"
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .pagination-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid hsl(var(--border));
        }
        .pagination-info {
          font-size: 0.8125rem;
          color: hsl(var(--muted-foreground));
        }
        .pagination-info strong {
          color: hsl(var(--foreground));
          font-weight: 600;
        }
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .page-btn {
          min-width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--secondary));
          color: hsl(var(--muted-foreground));
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          padding: 0 0.5rem;
        }
        .page-btn:hover:not(:disabled) {
          border-color: hsl(var(--primary) / 0.4);
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.08);
        }
        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-btn-active {
          background: var(--gradient-primary) !important;
          border-color: transparent !important;
          color: white !important;
          box-shadow: 0 2px 8px hsl(var(--primary) / 0.35);
        }
        .page-ellipsis {
          padding: 0 0.25rem;
          color: hsl(var(--muted-foreground));
          user-select: none;
        }
      `}</style>
    </div>
  );
}
