import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./pageSettingSlice";
import bgReducer from "./backgroundColorSlice";
import textReducer from "./textColorSlice";
import fontReducer from "./fontSlice";

export const appStore = configureStore({
    reducer: {
        pageColor: colorReducer,
        bgColor: bgReducer,
        textColor: textReducer,
        font: fontReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;