import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  updatePortfolioQuantity,
  removeFromPortfolio,
} from "../store/slices/portfolioSlice";
import Header from "./Header";

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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header />
      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 16px" }}
      >
        <div style={{ padding: "24px 0" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#111827",
                margin: "0 0 24px 0",
              }}
            >
              💼 My Portfolio
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#2563eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  padding: "24px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <p
                  style={{
                    color: "#bfdbfe",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0 0 8px 0",
                  }}
                >
                  Total Portfolio Value
                </p>
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  $
                  {totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: totalPL >= 0 ? "#16a34a" : "#dc2626",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  padding: "24px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <p
                  style={{
                    color: totalPL >= 0 ? "#bbf7d0" : "#fecaca",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0 0 8px 0",
                  }}
                >
                  Total P&L
                </p>
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {totalPL >= 0 ? "+" : ""}$
                  {Math.abs(totalPL).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#7c3aed",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  padding: "24px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <p
                  style={{
                    color: "#c4b5fd",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0 0 8px 0",
                  }}
                >
                  Holdings
                </p>
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {items.length} {items.length === 1 ? "Asset" : "Assets"}
                </p>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "128px", marginBottom: "24px" }}>📈</div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  margin: "0 0 16px 0",
                }}
              >
                Your portfolio is empty
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "18px",
                  margin: "0 0 24px 0",
                }}
              >
                Start building your crypto portfolio by adding some coins!
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {items.map((item) => {
                const coin = coins.find((c) => c.id === item.coinId);
                const price = coin ? coin.current_price : item.price;
                const total = item.quantity * price;
                const priceChange = coin
                  ? ((price - item.price) / item.price) * 100
                  : 0;
                return (
                  <div
                    key={item.coinId}
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
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            padding: "12px",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "48px", height: "48px" }}
                          />
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#111827",
                              margin: "0 0 4px 0",
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            style={{
                              color: "#6b7280",
                              textTransform: "uppercase",
                              fontWeight: "500",
                              fontSize: "12px",
                              margin: 0,
                            }}
                          >
                            {item.symbol}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "24px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              fontWeight: "500",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Quantity
                          </p>
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
                            style={{
                              width: "96px",
                              padding: "8px 12px",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                              textAlign: "center",
                              fontWeight: "500",
                              backgroundColor: "white",
                              outline: "none",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            textAlign: "center",
                            padding: "12px",
                            backgroundColor: "#eff6ff",
                            borderRadius: "8px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              fontWeight: "500",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Current Price
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "#111827",
                              fontSize: "18px",
                              margin: 0,
                            }}
                          >
                            ${price.toLocaleString()}
                          </p>
                        </div>

                        <div
                          style={{
                            textAlign: "center",
                            padding: "12px",
                            backgroundColor: "#f3e8ff",
                            borderRadius: "8px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              fontWeight: "500",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Total Value
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              color: "#111827",
                              margin: 0,
                            }}
                          >
                            $
                            {total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        <div
                          style={{
                            textAlign: "center",
                            padding: "12px",
                            borderRadius: "8px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              fontWeight: "500",
                              margin: "0 0 4px 0",
                            }}
                          >
                            24h Change
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              backgroundColor:
                                priceChange >= 0 ? "#dcfce7" : "#fee2e2",
                              color: priceChange >= 0 ? "#166534" : "#991b1b",
                              margin: 0,
                            }}
                          >
                            {priceChange >= 0 ? "+" : ""}
                            {priceChange.toFixed(2)}%
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromPortfolio(item.coinId))
                          }
                          style={{
                            color: "#dc2626",
                            backgroundColor: "transparent",
                            border: "none",
                            padding: "12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "20px",
                            transition: "all 0.2s",
                          }}
                          title="Remove from portfolio"
                        >
                          🗑️
                        </button>
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
