import { createSlice } from "@reduxjs/toolkit";

const fontSlice = createSlice({
  name: "Font",
  initialState: {
    isFont: localStorage.getItem("Font")
      ? JSON.parse(localStorage.getItem("Font") as string)
      : "",
  },
  reducers: {
    addFont: (state, action) => {
      state.isFont = action.payload;
      const newFont = JSON.stringify(state.isFont);
      localStorage.setItem("Font", newFont);
    },
  },
});

export const { addFont } = fontSlice.actions;

export default fontSlice.reducer;