/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  GET_GROUP_REQUEST,
  GetGroupFailure,
  GetGroupSuccess,
} from "../actions/socketActions";

function* handleGetGroupRequest() {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}/users/group`
    );

    if (response.status === 200) {
      const userData = response.data;
      yield put(GetGroupSuccess(userData));
    }
  } catch (error: any) {
    if (error.response) {
      yield put(GetGroupFailure(error.response.data.message));
    } else {
      yield put(GetGroupFailure("An error occurred"));
    }
  }
}

export function* watchGetGroupRequest() {
  yield takeEvery(GET_GROUP_REQUEST, handleGetGroupRequest);
}
