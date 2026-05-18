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
              <Rss size={18} />
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
                <Icon size={15} />
                {label}
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
          background: hsl(222, 47%, 7% / 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid hsl(var(--border));
          box-shadow: 0 1px 0 hsl(var(--primary) / 0.05);
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
          gap: 0.625rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }
        .brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.4);
        }
        .brand-text {
          font-size: 1.125rem;
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
          gap: 0.25rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          border-radius: calc(var(--radius) - 2px);
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: hsl(var(--foreground));
          background: hsl(var(--secondary));
        }
        .nav-link-active {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
        }
        .nav-link-active:hover {
          background: hsl(var(--primary) / 0.15);
          color: hsl(var(--primary));
        }

        @media (max-width: 480px) {
          .nav-link span { display: none; }
          .brand-text { font-size: 1rem; }
        }
      `}</style>
    </header>
  );
}
