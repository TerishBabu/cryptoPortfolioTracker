import React from "react";

const Loader: React.FC<{ size?: "small" | "large" }> = ({ size = "large" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: size === "large" ? "256px" : "32px",
    }}
  >
    <div
      style={{
        width: size === "large" ? "48px" : "24px",
        height: size === "large" ? "48px" : "24px",
        border: "4px solid #dbeafe",
        borderTop: "4px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default Loader;
