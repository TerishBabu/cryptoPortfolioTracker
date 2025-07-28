import {
  call,
  put,
  takeLatest,
  delay,
  fork,
  cancel,
  take,
} from "redux-saga/effects";
import {
  fetchCoinsRequest,
  fetchCoinsSuccess,
  fetchCoinsFailure,
} from "../slices/coinsSlice";
import { logout } from "../slices/authSlice";
import { Coin } from "../slices/coinsSlice";

function fetchCoinsApi(): Promise<Coin[]> {
  return fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
  )
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .catch(() => {
      throw new Error("Network error or API unavailable");
    });
}

function* fetchCoins(): Generator<any, void, any> {
  try {
    const coins: Coin[] = yield call(fetchCoinsApi);
    yield put(fetchCoinsSuccess(coins));
  } catch (error) {
    yield put(fetchCoinsFailure("Failed to fetch cryptocurrency data."));
  }
}

function* pollCoins(): Generator<any, void, any> {
  while (true) {
    try {
      yield delay(60000); // Poll every 60 seconds
      yield call(fetchCoins);
    } catch (error) {
      // Continue polling even if one request fails
      yield delay(10000); // Wait 10 seconds before retry
    }
  }
}

function* watchCoinsPolling(): Generator<any, void, any> {
  let pollingTask: any = null;

  while (true) {
    const action = yield take([fetchCoinsRequest.type, logout.type]);

    if (action.type === fetchCoinsRequest.type) {
      // Cancel existing polling
      if (pollingTask) {
        yield cancel(pollingTask);
      }

      // Fetch immediately
      yield call(fetchCoins);

      // Start new polling
      pollingTask = yield fork(pollCoins);
    } else if (action.type === logout.type) {
      // Cancel polling on logout
      if (pollingTask) {
        yield cancel(pollingTask);
        pollingTask = null;
      }
    }
  }
}

export default function* coinsSaga(): Generator<any, void, any> {
  yield fork(watchCoinsPolling);
}
