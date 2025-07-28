import React from "react";
import { Coin, setCoinLoading } from "../store/slices/coinsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToPortfolio } from "../store/slices/portfolioSlice";
import { RootState } from "../store";
import Loader from "./Loader";

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    border: "1px solid #f3f4f6",
    transition: "all 0.3s",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  coinInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconContainer: {
    padding: "8px",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
  },
  coinIcon: {
    width: "32px",
    height: "32px",
  },
  coinName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111827",
    margin: "0 0 4px 0",
  },
  coinSymbol: {
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    fontWeight: "500",
    margin: 0,
  },
  button: {
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    transition: "all 0.2s",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  },
  label: {
    color: "#6b7280",
    fontWeight: "500",
  },
  value: {
    fontWeight: "bold",
    color: "#111827",
  },
  changeValue: {
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "6px",
  },
};

const CoinCard: React.FC<{ coin: Coin }> = ({ coin }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.portfolio);
  const { coinLoading } = useSelector((state: RootState) => state.coins);

  const isInPortfolio = items.some((item) => item.coinId === coin.id);
  const isLoading = coinLoading[coin.id] || false;

  const handleAdd = async () => {
    if (isInPortfolio) return;
    dispatch(setCoinLoading({ coinId: coin.id, loading: true }));
    setTimeout(() => {
      dispatch(
        addToPortfolio({
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          quantity: 1,
          price: coin.current_price,
          image: coin.image,
        })
      );
      dispatch(setCoinLoading({ coinId: coin.id, loading: false }));
    }, 800);
  };

  const getButtonStyles = () => ({
    ...styles.button,
    cursor: isInPortfolio || isLoading ? "not-allowed" : "pointer",
    backgroundColor: isInPortfolio
      ? "#dcfce7"
      : isLoading
      ? "#93c5fd"
      : "#2563eb",
    color: isInPortfolio ? "#166534" : "white",
  });

  const getChangeStyles = () => ({
    ...styles.changeValue,
    backgroundColor:
      coin.price_change_percentage_24h >= 0 ? "#dcfce7" : "#fee2e2",
    color: coin.price_change_percentage_24h >= 0 ? "#166534" : "#991b1b",
  });

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.coinInfo}>
          <div style={styles.iconContainer}>
            <img src={coin.image} alt={coin.name} style={styles.coinIcon} />
          </div>
          <div>
            <h3 style={styles.coinName}>{coin.name}</h3>
            <p style={styles.coinSymbol}>{coin.symbol}</p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={isInPortfolio || isLoading}
          style={getButtonStyles()}
        >
          {isLoading ? (
            <div style={styles.buttonContent}>
              <Loader size="small" />
              <span>Adding...</span>
            </div>
          ) : isInPortfolio ? (
            "✓ In Portfolio"
          ) : (
            "+ Add to Portfolio"
          )}
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Price:</span>
          <span style={styles.value}>
            ${coin.current_price.toLocaleString()}
          </span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>24h Change:</span>
          <span style={getChangeStyles()}>
            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Market Cap:</span>
          <span style={styles.value}>
            ${(coin.market_cap / 1e9).toFixed(2)}B
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
