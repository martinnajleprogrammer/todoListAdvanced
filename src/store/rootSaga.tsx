import { all, fork } from 'redux-saga/effects';
import dbSaga from './dbSaga';

export default function* rootSaga() {
  yield all([fork(dbSaga)]);
}