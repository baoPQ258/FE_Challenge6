import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_GROUP_REQUEST,
  CreatGroupFailure,
  CreatGroupRequestAction,
  CreatGroupSuccess,
} from "../actions/socketActions";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "../../utils/cookies";

function* handleCreateGroupRequest(action: CreatGroupRequestAction) {
  try {
    const token = getCookie("token");
    if (!token) {
      yield put(CreatGroupFailure("Token is missing"));
      return;
    }
    const { name, title, userName, image } = action.payload;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response: AxiosResponse = yield call(
      axios.put,
      `${import.meta.env.VITE_API_URL}/users/group`,
      { name, title, userName, image },
      { headers }
    );

    if (response.status === 200) {
      const userData = response.data;
      yield put(CreatGroupSuccess(userData));
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      yield put(CreatGroupFailure(error.response.data.message));
    } else {
      yield put(CreatGroupFailure("An error occurred"));
    }
  }
}

export function* watchCreateGroupRequest() {
  yield takeEvery(CREATE_GROUP_REQUEST, handleCreateGroupRequest);
}
