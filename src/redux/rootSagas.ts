import { all } from "redux-saga/effects";
import { watchRegisterRequest } from "./sagas/registerSaga";
import { watchLoginRequest } from "./sagas/loginSaga";
import { watchProfileRequest } from "./sagas/getProfileSaga";
import { watchUpdateProfileRequest } from "./sagas/updateProfileSaga";
import { watchCreateGroupRequest } from "./sagas/createGroupSaga";
import { watchGetGroupRequest } from "./sagas/getGroupSaga";
import { watchUpdateGroupRequest } from "./sagas/updateGroupSaga";

function* rootSaga(): Generator {
  yield all([
    watchRegisterRequest(),
    watchLoginRequest(),
    watchProfileRequest(),
    watchUpdateProfileRequest(),
    watchCreateGroupRequest(),
    watchGetGroupRequest(),
    watchUpdateGroupRequest(),
  ]);
}

export default rootSaga;
