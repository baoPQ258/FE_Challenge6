/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  LOGIN_REQUEST,
  LoginRequestAction,
  loginFailure,
  loginSuccess,
} from "../actions/authActions";
import { setCookies } from "../../utils/cookies";

function* handleLoginRequest(
  action: LoginRequestAction
): Generator<any, void, AxiosResponse> {
  try {
    const { email, password } = action.payload;
    const response = yield call(axios.post, `${import.meta.env.VITE_API_URL}/users/auth`, {
      email,
      password,
    });
    const token = response.data.token;
    setCookies("token", token);
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginFailure("Error"));
  }
}

export function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUEST, handleLoginRequest);
}
