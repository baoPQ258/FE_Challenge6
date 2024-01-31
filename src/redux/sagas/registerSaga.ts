/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  REGISTER_REQUEST,
  RegisterRequestAction,
  registerFailure,
  registerSuccess,
} from "../actions/authActions";
import { setCookies } from "../../utils/cookies";

function* handleRegisterRequest(
  action: RegisterRequestAction
): Generator<any, void, AxiosResponse> {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse = yield call(
      axios.post,
      `${import.meta.env.VITE_API_URL}/users`,
      { email, password }
    );
    if (response.status === 201) {
      const data = response.data;
      setCookies("token", data.token);
      yield put(registerSuccess(data));
    }
  } catch (error: any) {
    if (error.response) {
      yield put(registerFailure(error.response.data.message));
    } else {
      yield put(registerFailure("An error occurred"));
    }
  }
}

export function* watchRegisterRequest() {
  yield takeEvery(REGISTER_REQUEST, handleRegisterRequest);
}
