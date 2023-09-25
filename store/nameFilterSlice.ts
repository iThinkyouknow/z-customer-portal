import { createSlice } from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";


// Initial state
const initialState: NameFilterState = {
    firstName: '',
    lastName: ''
};

// Actual Slice
export const nameFilterSlice = createSlice({
    name: "nameFilter",
    initialState,
    reducers: {
        // Action to set the authentication status
        setFirstName(state, action) {
            state.firstName = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        }
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        })
    },
});

export const { setFirstName, setLastName } = nameFilterSlice.actions;

export const selectNameFilter = (state: AppState) => state.nameFilter;

export default nameFilterSlice.reducer;