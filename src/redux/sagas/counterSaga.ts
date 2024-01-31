// sagas/counterSaga.ts
import { takeEvery, put } from 'redux-saga/effects';
import { INCREMENT } from '../actions/counterActions';
import { increment } from '../actions/counterActions';

function* handleIncrement() {
  // Simulate an API call or asynchronous operation
  yield new Promise((resolve) => setTimeout(resolve, 1000));

  // Dispatch the increment action
  yield put(increment());
}

export function* watchIncrement() {
  yield takeEvery(INCREMENT, handleIncrement);
}
