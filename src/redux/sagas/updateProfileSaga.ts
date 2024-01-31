// profileSaga.ts
import { takeEvery, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  UPDATE_PROFILE_REQUEST,
  UpdateProfileFailure,
  UpdateProfileRequestAction,
  UpdateProfileSuccess,
} from "../actions/profileActions";
import { getCookie } from "../../utils/cookies";

function* handleUpdateProfileRequest(action: UpdateProfileRequestAction) {
  try {
    const token = getCookie("token");
    if (!token) {
      yield put(UpdateProfileFailure("Token is missing"));
      return;
    }
    const { name, bio, phone, email, password, photo } = action.payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response: AxiosResponse = yield call(
      axios.put,
      `${import.meta.env.VITE_API_URL}/users/profile`,
      { name, bio, phone, photo, email, password },
      { headers }
    );

    if (response.status === 200) {
      const userData = response.data;
      yield put(UpdateProfileSuccess(userData));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      yield put(UpdateProfileFailure(error.response.data.message));
    } else {
      yield put(UpdateProfileFailure("An error occurred"));
    }
  }
}

export function* watchUpdateProfileRequest() {
  yield takeEvery(UPDATE_PROFILE_REQUEST, handleUpdateProfileRequest);
}
