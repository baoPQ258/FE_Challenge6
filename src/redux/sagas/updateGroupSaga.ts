/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import {
  UPDATE_GROUP_REQUEST,
  UpdateGroupFailure,
  UpdateGroupRequestAction,
  UpdateGroupSuccess,
} from "../actions/socketActions";
import { call, put, takeEvery } from "redux-saga/effects";

function* handleUpdateGroupRequest(
  action: UpdateGroupRequestAction
): Generator<any, void, AxiosResponse> {

  try {
    const { groupId, name, message, image } = action.payload;
    const response: AxiosResponse = yield call(
      axios.post,
      `${import.meta.env.VITE_API_URL}/users/add`,
      { groupId, name, message, image }
    );
    if (response.status === 200) {
      const data = response.data;
      yield put(UpdateGroupSuccess(data));
    }
  } catch (error: any) {
    if (error.response) {
      yield put(UpdateGroupFailure(error.response.data.message));
    } else {
      yield put(UpdateGroupFailure("An error occurred"));
    }
  }
}

export function* watchUpdateGroupRequest() {
  yield takeEvery(UPDATE_GROUP_REQUEST, handleUpdateGroupRequest);
}
