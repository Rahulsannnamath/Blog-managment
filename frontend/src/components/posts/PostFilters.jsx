import { useEffect } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { CATEGORIES, STATUSES } from "@/constants";

export default function PostFilters({ filters, onChange, onReset }) {
  const hasActiveFilters =
    filters.search || filters.category || filters.status;

  return (
    <div className="filters-bar">
      {/* Search */}
      <div className="search-wrapper">
        <Search size={15} className="search-icon" />
        <input
          id="filter-search"
          type="search"
          placeholder="Search by title, author, category…"
          value={filters.search || ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
          className="input-field search-input"
        />
        {filters.search && (
          <button
            className="search-clear"
            onClick={() => onChange({ ...filters, search: "", page: 1 })}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="select-wrapper">
        <select
          id="filter-category"
          value={filters.category || ""}
          onChange={(e) => onChange({ ...filters, category: e.target.value, page: 1 })}
          className="input-field select-filter"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="select-icon" />
      </div>

      {/* Status filter */}
      <div className="select-wrapper">
        <select
          id="filter-status"
          value={filters.status || ""}
          onChange={(e) => onChange({ ...filters, status: e.target.value, page: 1 })}
          className="input-field select-filter"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="select-icon" />
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button className="btn-ghost reset-btn" onClick={onReset} title="Clear all filters">
          <X size={14} />
          Reset
        </button>
      )}

      <style>{`
        .filters-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.625rem;
          flex: 1;
        }
        .search-wrapper {
          position: relative;
          flex: 1;
          min-width: 200px;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
        .search-input {
          padding-left: 2.25rem !important;
          padding-right: 2.25rem !important;
        }
        .search-clear {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .search-clear:hover { color: hsl(var(--foreground)); }
        .select-wrapper {
          position: relative;
          min-width: 150px;
        }
        .select-filter {
          padding-right: 2rem !important;
          cursor: pointer;
          appearance: none;
          background-image: none !important;
        }
        .select-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
        .reset-btn {
          padding: 0.5rem 0.875rem !important;
          font-size: 0.8rem !important;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .search-wrapper { min-width: 100%; }
          .select-wrapper { flex: 1; min-width: 130px; }
        }
      `}</style>
    </div>
  );
}
