import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages, total, limit } = pagination;

  if (totalPages <= 1) return null;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

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
        Showing <strong>{startItem}–{endItem}</strong> of <strong>{total}</strong> records
      </span>

      <div className="pagination-controls">
        <button
          id="pagination-prev"
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
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
          <ChevronRight size={15} />
        </button>
      </div>

      <style>{`
        .pagination-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-top: 1px solid hsl(var(--border));
          background: hsl(220 20% 98%);
          border-radius: 0 0 var(--radius) var(--radius);
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
          min-width: 32px;
          height: 32px;
          border-radius: 7px;
          border: 1px solid hsl(var(--border));
          background: white;
          color: hsl(var(--muted-foreground));
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.14s ease;
          padding: 0 0.45rem;
          font-family: inherit;
          box-shadow: 0 1px 2px hsl(0 0% 0% / 0.05);
        }
        .page-btn:hover:not(:disabled) {
          border-color: hsl(var(--primary) / 0.35);
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.06);
        }
        .page-btn:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }
        .page-btn-active {
          background: var(--gradient-primary) !important;
          border-color: transparent !important;
          color: white !important;
          box-shadow: 0 2px 8px hsl(var(--primary) / 0.3) !important;
        }
        .page-ellipsis {
          padding: 0 0.2rem;
          color: hsl(var(--muted-foreground));
          user-select: none;
          font-size: 0.875rem;
        }
        @media (max-width: 480px) {
          .pagination-info { font-size: 0.75rem; }
          .page-btn { min-width: 28px; height: 28px; font-size: 0.75rem; }
        }
      `}</style>
    </div>
  );
}
