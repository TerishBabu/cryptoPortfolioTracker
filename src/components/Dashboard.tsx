import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinsRequest } from "../store/slices/coinsSlice";
import { clearError } from "../store/slices/coinsSlice";
import { RootState } from "../store";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import CoinCard from "./CoinCard";
import Header from "./Header";

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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header />
      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 16px" }}
      >
        <div style={{ padding: "24px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                flex: "1",
                minWidth: "300px",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#111827",
                  margin: "0 0 8px 0",
                }}
              >
                📈 Top Cryptocurrencies
              </h2>
              <p style={{ color: "#6b7280", margin: 0 }}>
                Real-time data • Auto-refresh every 60s
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#93c5fd" : "#2563eb",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {loading && <Loader size="small" />}
              <span>{loading ? "Refreshing..." : "🔄 Refresh"}</span>
            </button>
          </div>

          {error && <ErrorMessage message={error} onClose={handleCloseError} />}

          {loading && coins.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "48px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Loader />
              <p
                style={{
                  color: "#6b7280",
                  marginTop: "16px",
                  fontSize: "18px",
                }}
              >
                Loading cryptocurrency data...
              </p>
            </div>
          ) : coins.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {coins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            !loading && (
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "48px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>📊</div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    margin: "0 0 8px 0",
                  }}
                >
                  No data available
                </h3>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  Click refresh to load cryptocurrency data
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
