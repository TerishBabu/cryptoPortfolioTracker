import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  updatePortfolioQuantity,
  removeFromPortfolio,
} from "../store/slices/portfolioSlice";
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
    marginBottom: "32px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 24px 0",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  statCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    textAlign: "center",
    color: "white",
  },
  totalValueCard: {
    backgroundColor: "#2563eb",
  },
  plCard: (isPositive: boolean) => ({
    backgroundColor: isPositive ? "#16a34a" : "#dc2626",
  }),
  holdingsCard: {
    backgroundColor: "#7c3aed",
  },
  statLabel: (color: string) => ({
    color,
    fontSize: "14px",
    fontWeight: "500",
    margin: "0 0 8px 0",
  }),
  statValue: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "64px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  emptyIcon: {
    fontSize: "128px",
    marginBottom: "24px",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "0 0 16px 0",
  },
  emptyDescription: {
    color: "#6b7280",
    fontSize: "18px",
    margin: "0 0 24px 0",
  },
  portfolioList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  portfolioItem: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    border: "1px solid #f3f4f6",
    transition: "all 0.3s",
  },
  itemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  coinInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  coinIcon: {
    padding: "12px",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
  },
  coinImage: {
    width: "48px",
    height: "48px",
  },
  coinName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 4px 0",
  },
  coinSymbol: {
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "12px",
    margin: 0,
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "16px",
    alignItems: "center",
  },
  dataSection: {
    textAlign: "center",
  },
  dataLabel: {
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: "500",
    margin: "0 0 8px 0",
  },
  quantityInput: {
    width: "100%",
    maxWidth: "96px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: "white",
    outline: "none",
    fontSize: "14px",
  },
  priceSection: {
    textAlign: "center",
    padding: "12px",
    backgroundColor: "#eff6ff",
    borderRadius: "8px",
  },
  valueSection: {
    textAlign: "center",
    padding: "12px",
    backgroundColor: "#f3e8ff",
    borderRadius: "8px",
  },
  changeSection: {
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
  },
  dataValue: {
    fontWeight: "bold",
    color: "#111827",
    fontSize: "16px",
    margin: 0,
  },
  changeValue: (isPositive: boolean) => ({
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: "6px",
    backgroundColor: isPositive ? "#dcfce7" : "#fee2e2",
    color: isPositive ? "#166534" : "#991b1b",
    margin: 0,
    fontSize: "14px",
  }),
  removeButton: {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px",
    transition: "all 0.2s",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
} as const;

const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.portfolio);
  const { coins } = useSelector((state: RootState) => state.coins);

  const totalValue = items.reduce((sum, item) => {
    const coin = coins.find((c) => c.id === item.coinId);
    const price = coin ? coin.current_price : item.price;
    return sum + item.quantity * price;
  }, 0);

  const totalPL = items.reduce((sum, item) => {
    const coin = coins.find((c) => c.id === item.coinId);
    const price = coin ? coin.current_price : item.price;
    return sum + (item.quantity * price - item.quantity * item.price);
  }, 0);

  const handleRemoveButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isEntering: boolean
  ) => {
    e.currentTarget.style.backgroundColor = isEntering ? "#fecaca" : "#fee2e2";
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.headerSection}>
            <h2 style={styles.title}>💼 My Portfolio</h2>
            <div style={styles.statsGrid}>
              <div style={{ ...styles.statCard, ...styles.totalValueCard }}>
                <p style={styles.statLabel("#bfdbfe")}>Total Portfolio Value</p>
                <p style={styles.statValue}>
                  $
                  {totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div
                style={{ ...styles.statCard, ...styles.plCard(totalPL >= 0) }}
              >
                <p
                  style={styles.statLabel(totalPL >= 0 ? "#bbf7d0" : "#fecaca")}
                >
                  Total P&L
                </p>
                <p style={styles.statValue}>
                  {totalPL >= 0 ? "+" : ""}$
                  {Math.abs(totalPL).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div style={{ ...styles.statCard, ...styles.holdingsCard }}>
                <p style={styles.statLabel("#c4b5fd")}>Holdings</p>
                <p style={styles.statValue}>
                  {items.length} {items.length === 1 ? "Asset" : "Assets"}
                </p>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📈</div>
              <h3 style={styles.emptyTitle}>Your portfolio is empty</h3>
              <p style={styles.emptyDescription}>
                Start building your crypto portfolio by adding some coins!
              </p>
            </div>
          ) : (
            <div style={styles.portfolioList}>
              {items.map((item) => {
                const coin = coins.find((c) => c.id === item.coinId);
                const price = coin ? coin.current_price : item.price;
                const total = item.quantity * price;
                const priceChange = coin
                  ? ((price - item.price) / item.price) * 100
                  : 0;

                return (
                  <div key={item.coinId} style={styles.portfolioItem}>
                    <div style={styles.itemContent}>
                      {/* Coin Info Section */}
                      <div style={styles.coinInfo}>
                        <div style={styles.coinIcon}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={styles.coinImage}
                          />
                        </div>
                        <div>
                          <h3 style={styles.coinName}>{item.name}</h3>
                          <p style={styles.coinSymbol}>{item.symbol}</p>
                        </div>
                      </div>

                      {/* Portfolio Data Section */}
                      <div style={styles.dataGrid}>
                        {/* Quantity */}
                        <div style={styles.dataSection}>
                          <p style={styles.dataLabel}>Quantity</p>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) =>
                              dispatch(
                                updatePortfolioQuantity({
                                  coinId: item.coinId,
                                  quantity: parseFloat(e.target.value) || 0,
                                })
                              )
                            }
                            style={styles.quantityInput}
                          />
                        </div>

                        {/* Current Price */}
                        <div style={styles.priceSection}>
                          <p style={styles.dataLabel}>Current Price</p>
                          <p style={styles.dataValue}>
                            $
                            {price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        {/* Total Value */}
                        <div style={styles.valueSection}>
                          <p style={styles.dataLabel}>Total Value</p>
                          <p style={styles.dataValue}>
                            $
                            {total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        {/* 24h Change */}
                        <div style={styles.changeSection}>
                          <p style={styles.dataLabel}>24h Change</p>
                          <p style={styles.changeValue(priceChange >= 0)}>
                            {priceChange >= 0 ? "+" : ""}
                            {priceChange.toFixed(2)}%
                          </p>
                        </div>

                        {/* Remove Button */}
                        <div style={styles.dataSection}>
                          <button
                            onClick={() =>
                              dispatch(removeFromPortfolio(item.coinId))
                            }
                            style={styles.removeButton}
                            title="Remove from portfolio"
                            onMouseEnter={(e) =>
                              handleRemoveButtonHover(e, true)
                            }
                            onMouseLeave={(e) =>
                              handleRemoveButtonHover(e, false)
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
