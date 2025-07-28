import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinsRequest } from "../store/slices/coinsSlice";
import { clearError } from "../store/slices/coinsSlice";
import { RootState } from "../store";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import CoinCard from "./CoinCard";
import Header from "./Header";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  main: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "24px 16px",
  },
  content: {
    padding: "24px 0",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    flexWrap: "wrap" as const,
    gap: "16px",
  },
  titleCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    flex: "1",
    minWidth: "300px",
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
  refreshButton: {
    color: "white",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
    whiteSpace: "nowrap" as const,
  },
  loadingContainer: {
    textAlign: "center" as const,
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "48px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  loadingText: {
    color: "#6b7280",
    marginTop: "16px",
    fontSize: "18px",
  },
  coinsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
  },
  emptyState: {
    textAlign: "center" as const,
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "48px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  emptyStateIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },
  emptyStateTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "0 0 8px 0",
  },
  emptyStateText: {
    color: "#6b7280",
    margin: 0,
  },
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector(
    (state: RootState) => state.coins
  );

  useEffect(() => {
    dispatch(fetchCoinsRequest());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchCoinsRequest());
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const getRefreshButtonStyles = () => ({
    ...styles.refreshButton,
    backgroundColor: loading ? "#93c5fd" : "#2563eb",
    cursor: loading ? "not-allowed" : "pointer",
  });

  const renderLoadingState = () => (
    <div style={styles.loadingContainer}>
      <Loader />
      <p style={styles.loadingText}>Loading cryptocurrency data...</p>
    </div>
  );

  const renderEmptyState = () => (
    <div style={styles.emptyState}>
      <div style={styles.emptyStateIcon}>📊</div>
      <h3 style={styles.emptyStateTitle}>No data available</h3>
      <p style={styles.emptyStateText}>
        Click refresh to load cryptocurrency data
      </p>
    </div>
  );

  const renderCoinsGrid = () => (
    <div style={styles.coinsGrid}>
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading && coins.length === 0) {
      return renderLoadingState();
    }

    if (coins.length > 0) {
      return renderCoinsGrid();
    }

    if (!loading) {
      return renderEmptyState();
    }

    return null;
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.headerSection}>
            <div style={styles.titleCard}>
              <h2 style={styles.title}>📈 Top Cryptocurrencies</h2>
              <p style={styles.subtitle}>
                Real-time data • Auto-refresh every 60s
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={getRefreshButtonStyles()}
            >
              {loading && <Loader size="small" />}
              <span>{loading ? "Refreshing..." : "🔄 Refresh"}</span>
            </button>
          </div>

          {error && <ErrorMessage message={error} onClose={handleCloseError} />}

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
