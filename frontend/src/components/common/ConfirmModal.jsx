import { AlertTriangle, Loader2 } from "lucide-react";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal-content">
        {/* Icon */}
        <div className="modal-icon">
          <AlertTriangle size={24} style={{ color: "hsl(var(--destructive))" }} />
        </div>

        {/* Title */}
        <h2 id="confirm-title" className="modal-title">
          {title}
        </h2>

        {/* Message */}
        <p className="modal-message">{message}</p>

        {/* Actions */}
        <div className="modal-actions">
          <button
            id="confirm-cancel-btn"
            className="btn-ghost"
            onClick={onCancel}
            disabled={loading}
            style={{ flex: 1, justifyContent: "center" }}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            className="btn-danger"
            onClick={onConfirm}
            disabled={loading}
            style={{ flex: 1, justifyContent: "center" }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="spin" />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>

      <style>{`
        .modal-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: hsl(var(--destructive) / 0.12);
          border: 1px solid hsl(var(--destructive) / 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
          color: hsl(var(--foreground));
        }
        .modal-message {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          text-align: center;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .modal-actions {
          display: flex;
          gap: 0.75rem;
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
