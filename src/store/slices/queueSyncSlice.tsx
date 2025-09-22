import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../store";
import {
  createTodoThunk,
  updateTodoThunk,
  removeTaskThunk,
  cloneTaskThunk
} from "./todosSlice";

export interface SyncAction {
  type: "add" | "update" | "remove" | "clone";
  payload: any;
}

interface QueueState {
  syncQueue: SyncAction[];
  retryDelay: number;
}

const initialState: QueueState = {
  syncQueue: [],
  retryDelay: 1000,
};

// Thunk para flush
export const flushQueueThunk = createAsyncThunk<void>(
  "queue/flushQueue",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { queue: QueueState };
    const actions = [...state.queue.syncQueue];

    try {
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];

        switch (action.type) {
          case "add": {
            const tempId = action.payload.id;
            const result = await store.dispatch(createTodoThunk({ text: action.payload.text, tempId })).unwrap();
            if (!result.tempId) {
              throw new Error("Result ID is undefined");
            }

            for (let j = i + 1; j < actions.length; j++) {
              const a = actions[j];
              if (a.payload.id === tempId) {
                a.payload.id = result.tempId;
              }
              if (a.payload.todo?.id === tempId) {
                a.payload.todo.id = result.tempId;
              }
            }

            break;
          }

          case "update":
            await store.dispatch(updateTodoThunk(action.payload)).unwrap();
            break;

          case "remove": {
            const id = action.payload.id;
            if (id?.startsWith("temp-")) {
              // Not existing in BE, skip
              continue;
            }
            await store.dispatch(removeTaskThunk(id)).unwrap();
            break;
          }
          case "clone": {
            debugger;
            const tempId = action.payload.id;
            const result = await store.dispatch(cloneTaskThunk({ todo: action.payload, tempId })).unwrap();
            if (!result.tempId) {
              throw new Error("Result ID is undefined");
            }
            break;
          }
        }
      }
    } catch (err) {
      console.error("Flush failed", err);
      return rejectWithValue(err);
    }
  }
);

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    enqueue: (state, action: PayloadAction<SyncAction>) => {
      state.syncQueue.push(action.payload);
    },
    clearQueue: (state) => {
      state.syncQueue = [];
    },
    increaseRetryDelay: (state) => {
      state.retryDelay = Math.min(state.retryDelay * 2, 60000);
    },
    resetRetryDelay: (state) => {
      state.retryDelay = 1000;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(flushQueueThunk.rejected, (state) => {
      state.retryDelay = Math.min(state.retryDelay * 2, 60000);
    });
  },
});

export const { enqueue, clearQueue, increaseRetryDelay, resetRetryDelay } = queueSlice.actions;
export default queueSlice.reducer;
