// authSaga.ts
import { takeEvery, put } from "redux-saga/effects";
import { LOGOUT_REQUEST, logoutSuccess } from "../actions/authActions";
import { removeCookies } from "../../utils/cookies";

function* handleLogout() {
  yield removeCookies("token");
  yield put(logoutSuccess());
}

export function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, handleLogout);
}
