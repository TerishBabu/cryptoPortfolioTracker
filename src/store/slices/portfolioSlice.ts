import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PortfolioItem {
  coinId: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  image: string;
}

interface PortfolioState {
  items: PortfolioItem[];
}

const getStoredPortfolio = (): PortfolioItem[] => {
  try {
    return JSON.parse(localStorage.getItem("portfolio") || "[]");
  } catch {
    return [];
  }
};

const initialState: PortfolioState = {
  items: getStoredPortfolio(),
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      const existingItem = state.items.find(
        (item) => item.coinId === action.payload.coinId
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    updatePortfolioQuantity: (
      state,
      action: PayloadAction<{ coinId: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.coinId === action.payload.coinId);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
      }
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.coinId !== action.payload);
    },
    loadPortfolio: (state, action: PayloadAction<PortfolioItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToPortfolio,
  updatePortfolioQuantity,
  removeFromPortfolio,
  loadPortfolio,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
