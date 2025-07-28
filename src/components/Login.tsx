import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../store/slices/authSlice";
import { RootState } from "../store";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
    padding: "16px",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "32px",
    width: "100%",
    maxWidth: "448px",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "32px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#6b7280",
    margin: 0,
  },
  demoCredentials: {
    backgroundColor: "#f3f4f6",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
    fontSize: "14px",
    color: "#6b7280",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: "16px",
    transition: "border-color 0.2s",
  },
  inputFocus: {
    borderColor: "#2563eb",
  },
  inputDisabled: {
    backgroundColor: "#f9fafb",
    color: "#9ca3af",
    cursor: "not-allowed",
  },
  errorContainer: {
    marginBottom: "24px",
  },
  submitButton: {
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
    transition: "all 0.2s",
    gap: "8px",
  },
  submitButtonNormal: {
    backgroundColor: "#2563eb",
    cursor: "pointer",
  },
  submitButtonLoading: {
    backgroundColor: "#93c5fd",
    cursor: "not-allowed",
  },
  submitButtonHover: {
    backgroundColor: "#1d4ed8",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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

  const getInputStyles = (inputName: string) => ({
    ...styles.input,
    ...(focusedInput === inputName ? styles.inputFocus : {}),
    ...(loading ? styles.inputDisabled : {}),
  });

  const getSubmitButtonStyles = () => ({
    ...styles.submitButton,
    ...(loading ? styles.submitButtonLoading : styles.submitButtonNormal),
    ...(isButtonHovered && !loading ? styles.submitButtonHover : {}),
  });

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.header}>
          <h2 style={styles.title}>🧭 Crypto Portfolio</h2>
          <p style={styles.subtitle}>Track your cryptocurrency investments</p>
        </div>

        <div style={styles.demoCredentials}>
          <strong>Demo Credentials:</strong>
          <br />
          Username: admin
          <br />
          Password: admin123
        </div>

        <input
          style={getInputStyles("username")}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => handleInputFocus("username")}
          onBlur={handleInputBlur}
          required
          disabled={loading}
        />

        <input
          style={getInputStyles("password")}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleInputFocus("password")}
          onBlur={handleInputBlur}
          required
          disabled={loading}
        />

        {error && (
          <div style={styles.errorContainer}>
            <ErrorMessage message={error} />
          </div>
        )}

        <button
          style={getSubmitButtonStyles()}
          type="submit"
          disabled={loading}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {loading ? (
            <div style={styles.buttonContent}>
              <Loader size="small" />
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
