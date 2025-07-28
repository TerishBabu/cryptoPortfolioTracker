import React from "react";
import { Coin, setCoinLoading } from "../store/slices/coinsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToPortfolio } from "../store/slices/portfolioSlice";
import { RootState } from "../store";
import Loader from "./Loader";

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

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        border: "1px solid #f3f4f6",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "50%",
            }}
          >
            <img
              src={coin.image}
              alt={coin.name}
              style={{ width: "32px", height: "32px" }}
            />
          </div>
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#111827",
                margin: "0 0 4px 0",
              }}
            >
              {coin.name}
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                textTransform: "uppercase",
                fontWeight: "500",
                margin: 0,
              }}
            >
              {coin.symbol}
            </p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={isInPortfolio || isLoading}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            border: "none",
            cursor: isInPortfolio || isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            backgroundColor: isInPortfolio
              ? "#dcfce7"
              : isLoading
              ? "#93c5fd"
              : "#2563eb",
            color: isInPortfolio ? "#166534" : "white",
          }}
        >
          {isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#6b7280", fontWeight: "500" }}>Price:</span>
          <span style={{ fontWeight: "bold", color: "#111827" }}>
            ${coin.current_price.toLocaleString()}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#6b7280", fontWeight: "500" }}>
            24h Change:
          </span>
          <span
            style={{
              fontWeight: "bold",
              padding: "4px 8px",
              borderRadius: "6px",
              backgroundColor:
                coin.price_change_percentage_24h >= 0 ? "#dcfce7" : "#fee2e2",
              color:
                coin.price_change_percentage_24h >= 0 ? "#166534" : "#991b1b",
            }}
          >
            {coin.price_change_percentage_24h >= 0 ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#6b7280", fontWeight: "500" }}>
            Market Cap:
          </span>
          <span style={{ fontWeight: "bold", color: "#111827" }}>
            ${(coin.market_cap / 1e9).toFixed(2)}B
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
