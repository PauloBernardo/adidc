import { takeEvery, select } from 'redux-saga/effects';

function* rootSaga() {
  // Logger
  yield takeEvery('*', function* logger(action) {
    const state = yield select();

    console.log('Action:', action.type);
    console.log('State after:', state);
  });
}

export default rootSaga;
