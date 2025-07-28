import React from "react";

const styles = {
  container: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    position: "relative" as const,
  },
  message: {
    display: "block",
    paddingRight: "32px", // Add padding to prevent text overlap with close button
  },
  closeButton: {
    position: "absolute" as const,
    top: "0",
    right: "0",
    padding: "12px 16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#991b1b",
    fontSize: "20px",
    lineHeight: "1",
    transition: "opacity 0.2s",
  },
  closeButtonHover: {
    opacity: 0.7,
  },
};

const ErrorMessage: React.FC<{ message: string; onClose?: () => void }> = ({
  message,
  onClose,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getCloseButtonStyles = () => ({
    ...styles.closeButton,
    ...(isHovered ? styles.closeButtonHover : {}),
  });

  return (
    <div style={styles.container}>
      <span style={styles.message}>{message}</span>
      {onClose && (
        <button
          style={getCloseButtonStyles()}
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Close error message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
