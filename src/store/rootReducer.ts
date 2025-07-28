import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coinsReducer from "./slices/coinsSlice";
import portfolioReducer from "./slices/portfolioSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  coins: coinsReducer,
  portfolio: portfolioReducer,
  ui: uiReducer,
});

export default rootReducer;
