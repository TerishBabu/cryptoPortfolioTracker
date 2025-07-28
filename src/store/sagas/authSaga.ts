import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../slices/authSlice";

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;

    // Simulate API delay
    yield new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("token", "dummy-token");
      sessionStorage.setItem("user", username);
      yield put(loginSuccess(username));
    } else {
      yield put(loginFailure("Invalid credentials. Try admin/admin123."));
    }
  } catch (error) {
    yield put(loginFailure("Login failed. Please try again."));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export default function* authSaga(): Generator<any, void, any> {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
