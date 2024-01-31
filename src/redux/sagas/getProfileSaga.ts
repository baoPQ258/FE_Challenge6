/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  PROFILE_REQUEST,
  ProfileFailure,
  ProfileSuccess,
} from "../actions/authActions";
import { getCookie } from "../../utils/cookies";

function* handleProfileRequest() {
  try {
    const token = getCookie("token");
    if (!token) {
      yield put(ProfileFailure("Token is missing"));
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response: AxiosResponse = yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}/users/profile`,
      { headers }
    );

    if (response.status === 200) {
      const userData = response.data;
      yield put(ProfileSuccess(userData));
    }
  } catch (error: any) {
    if (error.response) {
      yield put(ProfileFailure(error.response.data.message));
    } else {
      yield put(ProfileFailure("An error occurred"));
    }
  }
}

export function* watchProfileRequest() {
  yield takeEvery(PROFILE_REQUEST, handleProfileRequest);
}
