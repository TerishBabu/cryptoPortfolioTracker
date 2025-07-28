import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  coinLoading: { [key: string]: boolean };
}

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
  coinLoading: {},
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    fetchCoinsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoinsSuccess: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCoinsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCoinLoading: (
      state,
      action: PayloadAction<{ coinId: string; loading: boolean }>
    ) => {
      state.coinLoading[action.payload.coinId] = action.payload.loading;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCoinsRequest,
  fetchCoinsSuccess,
  fetchCoinsFailure,
  setCoinLoading,
  clearError,
} = coinsSlice.actions;
export default coinsSlice.reducer;
