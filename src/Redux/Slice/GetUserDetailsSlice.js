import { createSlice } from '@reduxjs/toolkit';
import { GetUserDetailsApi } from '../Api/GetUserDetailsApi';

const GetUserDetailsSlice = createSlice({
  name: 'GetUserDetails',
  initialState: {
    GetUserDetailsLoading: false,
    isError: false,
    GetUserDetailsData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetUserDetailsApi.pending, (state, action) => {
      state.GetUserDetailsLoading = true;
    });
    builder.GetCase(GetUserDetailsApi.fulfilled, (state, action) => {
      state.GetUserDetailsLoading = false;
      state.GetUserDetailsData = action.payload;
    });
    builder.GetCase(GetUserDetailsApi.rejected, (state, action) => {
      state.GetUserDetailsLoading = false;
      state.isError = true;
    });
  },
});


export default GetUserDetailsSlice.reducer;
