import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const dark = (state) => state.theme.dark;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
