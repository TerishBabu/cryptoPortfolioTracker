import React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerLarge: {
    height: "256px",
  },
  containerSmall: {
    height: "32px",
  },
  spinner: {
    borderRadius: "50%",
    border: "4px solid #dbeafe",
    borderTop: "4px solid #2563eb",
    animation: "spin 1s linear infinite",
  },
  spinnerLarge: {
    width: "48px",
    height: "48px",
  },
  spinnerSmall: {
    width: "24px",
    height: "24px",
  },
  keyframes: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
};

const Loader: React.FC<{ size?: "small" | "large" }> = ({ size = "large" }) => {
  const getContainerStyles = () => ({
    ...styles.container,
    ...(size === "large" ? styles.containerLarge : styles.containerSmall),
  });

  const getSpinnerStyles = () => ({
    ...styles.spinner,
    ...(size === "large" ? styles.spinnerLarge : styles.spinnerSmall),
  });

  return (
    <div style={getContainerStyles()}>
      <div style={getSpinnerStyles()}></div>
      <style>{styles.keyframes}</style>
    </div>
  );
};

export default Loader;
