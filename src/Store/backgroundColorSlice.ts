import { createSlice } from "@reduxjs/toolkit";

const backgroundColorSlice = createSlice({
    name: "bgColor",
    initialState: {
        isBgColor: localStorage.getItem("bg-color")
        ? JSON.parse(localStorage.getItem("bg-color") as string)
        : "",
    },
    reducers: {
        addBgColor: (state, action) => {
            state.isBgColor = action.payload;
            const newColor = JSON.stringify(state.isBgColor);
            localStorage.setItem('bg-color', newColor);
        },
    }
});

export const { addBgColor } = backgroundColorSlice.actions;

export default backgroundColorSlice.reducer;