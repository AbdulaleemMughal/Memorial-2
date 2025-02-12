import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
    name: "pageColor",
    initialState: {
        isPageColor: localStorage.getItem("page-color")
        ? JSON.parse(localStorage.getItem("page-color") as string)
        : "",
    },
    reducers: {
        addColor: (state, action) => {
            state.isPageColor = action.payload;
            const newColor = JSON.stringify(state.isPageColor);
            localStorage.setItem('page-color', newColor);
        },
    }
});

export const { addColor } = colorSlice.actions;

export default colorSlice.reducer;