import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

const VITE_BD_URL = import.meta.env.VITE_BD_URL;

interface DBState {
  isConnected: 'connected' | 'disconnected';
  lastChecked: number | null;
  error?: string;
  polling: boolean;
}

const initialState: DBState = {
  isConnected: 'disconnected',
  lastChecked: null,
  error: undefined,
  polling: false,
};

// Thunk to check DB connection
export const checkDBConnection = createAsyncThunk(
  'db/checkConnection',
  async (_, thunkAPI) => {
    const { signal } = thunkAPI;
    try {
      const response = await fetch(`${VITE_BD_URL}/todos`, { signal });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to connect to the database' + error);
    }
  }
);

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    startPolling() {
    },
    stopPolling() {
    },
    setPolling(state, action: PayloadAction<boolean>) {
      const value = action.payload;
      state.polling = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDBConnection.pending, (state) => {
        state.error = undefined;
      })
      .addCase(checkDBConnection.fulfilled, (state) => {
        state.isConnected = 'connected';
        state.lastChecked = Date.now();
        state.error = undefined;
      })
      .addCase(checkDBConnection.rejected, (state, action) => {
        state.isConnected = 'disconnected';
        state.lastChecked = Date.now();
        state.error = action.payload as string;
      });
  },
});
export const { startPolling, stopPolling, setPolling } = dbSlice.actions;
export default dbSlice.reducer;

export const selectDBStatus = (state: { db: DBState }) => state.db;
export const selectIsDBConnected = (state: { db: DBState }) => state.db.isConnected;
export const selectDBError = (state: { db: DBState }) => state.db.error;
export const selectDBLastChecked = (state: { db: DBState }) => state.db.lastChecked;
export const selectIsPolling = (state: { db: DBState }) => state.db.polling;