import { createSlice } from "@reduxjs/toolkit";

const textColorSlice = createSlice({
    name: "textColor",
    initialState: {
        isTextColor: localStorage.getItem("text-color")
        ? JSON.parse(localStorage.getItem("text-color") as string)
        : "",
    },
    reducers: {
        addTextColor: (state, action) => {
            state.isTextColor = action.payload;
            const newColor = JSON.stringify(state.isTextColor);
            localStorage.setItem('text-color', newColor);
        },
    }
});

export const { addTextColor } = textColorSlice.actions;

export default textColorSlice.reducer;