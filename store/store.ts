import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";

import { nameFilterSlice } from "./nameFilterSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
    [nameFilterSlice.name]: nameFilterSlice.reducer,
});

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    });


export type AppStore = ReturnType<typeof makeConfiguredStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeConfiguredStore);
