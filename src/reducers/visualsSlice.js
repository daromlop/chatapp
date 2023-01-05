import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  darkMode: false,
};

export const visualsSlice = createSlice({
  name: "visuals",
  initialState: initialState,
  reducers: {
    setMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setMenu, setDarkMode } = visualsSlice.actions;

export default visualsSlice.reducer;
