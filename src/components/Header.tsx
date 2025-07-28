import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.portfolio);
  const location = useLocation();

  return (
    <header
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#2563eb",
            margin: 0,
          }}
        >
          🧭 Crypto Portfolio Tracker
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>
            Welcome, {user}!
          </span>
          <nav style={{ display: "flex", gap: "16px" }}>
            <Link
              to="/dashboard"
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.2s",
                backgroundColor:
                  location.pathname === "/dashboard"
                    ? "#dbeafe"
                    : "transparent",
                color:
                  location.pathname === "/dashboard" ? "#1d4ed8" : "#6b7280",
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/portfolio"
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.2s",
                backgroundColor:
                  location.pathname === "/portfolio"
                    ? "#dbeafe"
                    : "transparent",
                color:
                  location.pathname === "/portfolio" ? "#1d4ed8" : "#6b7280",
              }}
            >
              Portfolio ({items.length})
            </Link>
          </nav>
          <button
            onClick={() => dispatch(logout())}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
