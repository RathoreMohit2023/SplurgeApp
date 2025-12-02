import { createSlice } from '@reduxjs/toolkit';
import { ForgoteApi } from '../Api/ForgoteApi'

const forgoteSlice = createSlice({
    name: "Forgote",
    initialState: {
        forgoteLoading: false,
        forgoteData: [],
        isError: false,
    },

    extraReducers: (builder) => {
        builder.addCase(ForgoteApi.pending, (state, action) => {
            state.forgoteLoading = true;
        });
        builder.addCase(ForgoteApi.fulfilled, (state, action) => {
            state.forgoteLoading = false;
            state.forgoteData = action.payload;
        });
        builder.addCase(ForgoteApi.rejected, (state, action) => {
            state.forgoteLoading = false;
            state.isError = true;
        });
    }
});

export default forgoteSlice.reducer;