import { take, put, fork, cancel, delay, select, cancelled } from "redux-saga/effects";
import {
  checkDBConnection,
  startPolling,
  stopPolling,
  setPolling,
  selectIsDBConnected,
} from "./slices/dbSlice";

const BASE_INTERVAL_MS = 5000;
const MAX_INTERVAL_MS = 60_000;

function getBackoff(attempt: number) {
  const candidate = BASE_INTERVAL_MS * Math.pow(2, Math.max(0, attempt - 1));
  return Math.min(candidate, MAX_INTERVAL_MS);
}

function addJitter(ms: number) {
  const jitter = Math.floor(Math.random() * 1000) - 500;
  return Math.max(1000, ms + jitter);
}

function* pollDbWorker() {
  try {
    let attempt = 0;

    while (true) {
      yield put(checkDBConnection());
      const action = yield take([
        checkDBConnection.fulfilled.type,
        checkDBConnection.rejected.type,
      ]);

      if (action.type === checkDBConnection.fulfilled.type) {
        // conectado -> cortamos polling
        yield put(setPolling(false));
        break;
      }

      attempt++;
      const wait = addJitter(getBackoff(attempt));

      const current = yield select(selectIsDBConnected);
      if (current === "connected") {
        yield put(setPolling(false));
        break;
      }

      yield delay(wait);
    }
  } finally {
    if (yield cancelled()) {
      yield put(setPolling(false));
    }
  }
}

function* watchPolling() {
  while (true) {
    yield take(startPolling.type);

    const isConnected: "connected" | "disconnected" | "unknown" = yield select(
      selectIsDBConnected
    );
    if (isConnected === "connected") continue;

    yield put(setPolling(true));
    const task = yield fork(pollDbWorker);

    yield take(stopPolling.type);
    yield cancel(task);
    yield put(setPolling(false));
  }
}

export default function* dbSaga() {
  yield fork(watchPolling);
}
