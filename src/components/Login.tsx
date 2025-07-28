import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../store/slices/authSlice";
import { RootState } from "../store";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }

    setLoading(true);
    dispatch(loginRequest({ username: username.trim(), password }));

    // Reset loading after a delay (auth saga handles the actual login)
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
        padding: "16px",
      }}
    >
      <form
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "32px",
          width: "100%",
          maxWidth: "448px",
        }}
        onSubmit={handleLogin}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 8px 0",
            }}
          >
            🚀 Crypto Portfolio
          </h2>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Track your cryptocurrency investments
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          <strong>Demo Credentials:</strong>
          <br />
          Username: admin
          <br />
          Password: admin123
        </div>

        <input
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "16px",
            transition: "border-color 0.2s",
          }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <input
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "24px",
            transition: "border-color 0.2s",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 16px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "12px",
            color: "white",
            backgroundColor: loading ? "#93c5fd" : "#2563eb",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            gap: "8px",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader size="small" />
              <span>Signing In...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
