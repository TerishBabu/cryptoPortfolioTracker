import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store";
import { Link, useLocation } from "react-router-dom";

const styles = {
  header: {
    backgroundColor: "white",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    borderBottom: "1px solid #e5e7eb",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
    margin: 0,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  welcomeText: {
    fontSize: "14px",
    color: "#6b7280",
  },
  nav: {
    display: "flex",
    gap: "16px",
  },
  navLink: {
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  navLinkActive: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
  },
  navLinkInactive: {
    backgroundColor: "transparent",
    color: "#6b7280",
  },
  navLinkHover: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  logoutButtonHover: {
    backgroundColor: "#dc2626",
  },
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.portfolio);
  const location = useLocation();

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const getNavLinkStyles = (path: string) => {
    const isActive = location.pathname === path;
    const isHovered = hoveredLink === path && !isActive;

    return {
      ...styles.navLink,
      ...(isActive ? styles.navLinkActive : styles.navLinkInactive),
      ...(isHovered ? styles.navLinkHover : {}),
    };
  };

  const getLogoutButtonStyles = () => ({
    ...styles.logoutButton,
    ...(isLogoutHovered ? styles.logoutButtonHover : {}),
  });

  const handleLinkMouseEnter = (path: string) => {
    setHoveredLink(path);
  };

  const handleLinkMouseLeave = () => {
    setHoveredLink(null);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>🧭 Crypto Portfolio Tracker</h1>

        <div style={styles.rightSection}>
          <span style={styles.welcomeText}>Welcome, {user}!</span>

          <nav style={styles.nav}>
            <Link
              to="/dashboard"
              style={getNavLinkStyles("/dashboard")}
              onMouseEnter={() => handleLinkMouseEnter("/dashboard")}
              onMouseLeave={handleLinkMouseLeave}
            >
              Dashboard
            </Link>

            <Link
              to="/portfolio"
              style={getNavLinkStyles("/portfolio")}
              onMouseEnter={() => handleLinkMouseEnter("/portfolio")}
              onMouseLeave={handleLinkMouseLeave}
            >
              Portfolio ({items.length})
            </Link>
          </nav>

          <button
            onClick={() => dispatch(logout())}
            style={getLogoutButtonStyles()}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
