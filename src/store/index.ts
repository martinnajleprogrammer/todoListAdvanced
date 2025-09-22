import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import todoReducer from "./slices/todosSlice";
import uiSliceReducer from "./slices/uiSlice";
import bdSliceReducer from "./slices/dbSlice";
import queueSyncSliceReducer from "./slices/queueSyncSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga"; // 

const queuePersistConfig = {
  key: "queue",
  storage,
  whitelist: ["syncQueue"],
};

const sagaMiddleware = createSagaMiddleware();
const persistedQueueReducer = persistReducer(queuePersistConfig, queueSyncSliceReducer);

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    ui: uiSliceReducer,
    db: bdSliceReducer,
    queue: persistedQueueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
