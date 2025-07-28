import React from "react";

const ErrorMessage: React.FC<{ message: string; onClose?: () => void }> = ({
  message,
  onClose,
}) => (
  <div
    style={{
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#991b1b",
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "16px",
      position: "relative",
    }}
  >
    <span>{message}</span>
    {onClose && (
      <button
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "12px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        ×
      </button>
    )}
  </div>
);

export default ErrorMessage;
