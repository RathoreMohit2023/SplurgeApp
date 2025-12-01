import { createSlice } from '@reduxjs/toolkit';
import { GetFounderApi } from '../Api/GetFounderApi';

const GetFounderSlice = createSlice({
  name: 'GetFounder',
  initialState: {
    GetFounderloading: false,
    isError: false,
    GetFiunderData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetFounderApi.pending, (state, action) => {
      state.GetFounderloading = true;
    });
    builder.GetCase(GetFounderApi.fulfilled, (state, action) => {
      state.GetFounderloading = false;
      state.GetFiunderData = action.payload;
    });
    builder.GetCase(GetFounderApi.rejected, (state, action) => {
      state.GetFounderloading = false;
      state.isError = true;
    });
  },
});


export default GetFounderSlice.reducer;
