import { Link, useLocation, useNavigate } from "react-router-dom";
import { PenSquare, LayoutList, Rss } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Posts", icon: LayoutList },
  { to: "/posts/new", label: "New Post", icon: PenSquare },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar">
      <div className="container">
        <nav className="navbar-inner">
          {/* Brand */}
          <button
            onClick={() => navigate("/")}
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

          {/* Nav links */}
          <div className="nav-links">
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
        </nav>
      </div>

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

        @media (max-width: 480px) {
          .nav-link span { display: none; }
          .nav-link { padding: 0.45rem 0.6rem; }
          .brand-text { font-size: 0.95rem; }
        }
      `}</style>
    </header>
  );
}
