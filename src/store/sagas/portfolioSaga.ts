import { takeEvery, select } from "redux-saga/effects";
import {
  addToPortfolio,
  updatePortfolioQuantity,
  removeFromPortfolio,
} from "../slices/portfolioSlice";
import { RootState } from "../index";
import { PortfolioItem } from "../slices/portfolioSlice";

function* persistPortfolio(): Generator<any, void, any> {
  try {
    const items: PortfolioItem[] = yield select(
      (state: RootState) => state.portfolio.items
    );
    localStorage.setItem("portfolio", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to persist portfolio:", error);
  }
}

export default function* portfolioSaga(): Generator<any, void, any> {
  yield takeEvery(
    [
      addToPortfolio.type,
      updatePortfolioQuantity.type,
      removeFromPortfolio.type,
    ],
    persistPortfolio
  );
}
