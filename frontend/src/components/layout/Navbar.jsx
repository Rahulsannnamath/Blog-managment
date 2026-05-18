import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PenSquare, LayoutList, Rss, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Posts", icon: LayoutList },
  { to: "/posts/new", label: "New Post", icon: PenSquare },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container">
        <nav className="navbar-inner">
          {/* Brand */}
          <button
            onClick={() => { navigate("/"); closeMobile(); }}
            className="brand"
            aria-label="Go to home"
          >
            <div className="brand-icon">
              <Rss size={16} />
            </div>
            <span className="brand-text">
              Blog<span className="brand-accent">Manager</span>
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="nav-links nav-links-desktop">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive(to) ? "nav-link-active" : ""}`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mobile-nav">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-nav-link ${isActive(to) ? "mobile-nav-link-active" : ""}`}
              onClick={closeMobile}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: #ffffff;
          border-bottom: 1px solid hsl(var(--border));
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.05);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          gap: 1rem;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.575rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px hsl(var(--primary) / 0.3);
          flex-shrink: 0;
        }
        .brand-text {
          font-size: 1.05rem;
          font-weight: 800;
          color: hsl(var(--foreground));
          letter-spacing: -0.02em;
        }
        .brand-accent {
          color: hsl(var(--primary));
        }

        /* Desktop nav */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.8rem;
          border-radius: calc(var(--radius) - 2px);
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: hsl(var(--foreground));
          background: hsl(var(--secondary));
        }
        .nav-link-active {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.08);
          font-weight: 600;
        }
        .nav-link-active:hover {
          background: hsl(var(--primary) / 0.12);
          color: hsl(var(--primary));
        }

        /* Hamburger button – hidden on desktop */
        .hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid hsl(var(--border));
          background: white;
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .hamburger-btn:hover {
          background: hsl(var(--secondary));
          border-color: hsl(var(--primary) / 0.25);
          color: hsl(var(--primary));
        }

        /* Mobile dropdown */
        .mobile-nav {
          border-top: 1px solid hsl(var(--border));
          background: white;
          padding: 0.5rem 0;
          animation: slideDown 0.18s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .mobile-nav-link:hover {
          background: hsl(var(--secondary));
          color: hsl(var(--foreground));
        }
        .mobile-nav-link-active {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.07);
          font-weight: 600;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-links-desktop { display: none; }
          .hamburger-btn { display: flex; }
        }

        @media (max-width: 480px) {
          .brand-text { font-size: 0.95rem; }
          .brand-icon { width: 28px; height: 28px; border-radius: 7px; }
          .navbar-inner { height: 54px; }
          .hamburger-btn { width: 32px; height: 32px; }
        }

        @media (max-width: 360px) {
          .brand-text { font-size: 0.875rem; }
          .mobile-nav-link { padding: 0.7rem 1rem; font-size: 0.875rem; }
        }
      `}</style>
    </header>
  );
}
