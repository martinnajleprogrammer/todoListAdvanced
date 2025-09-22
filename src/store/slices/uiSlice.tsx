import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
}
const savedMode = localStorage.getItem('darkMode');

const initialState: UIState = {
  darkMode: savedMode === 'true'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
  },
});

export const { toggleDarkMode, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
