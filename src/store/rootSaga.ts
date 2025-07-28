import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import coinsSaga from "./sagas/coinsSaga";
import portfolioSaga from "./sagas/portfolioSaga";

export default function* rootSaga() {
  yield all([authSaga(), coinsSaga(), portfolioSaga()]);
}
