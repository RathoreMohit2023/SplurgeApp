import { createSlice } from '@reduxjs/toolkit';
import { GetWishlistApi } from '../Api/GetWishlistApi';

const GetWishlistSlice = createSlice({
  name: 'GetWishlist',
  initialState: {
    GetWishlistLoading: false,
    isError: false,
    GetWishlistData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetWishlistApi.pending, (state, action) => {
      state.GetWishlistLoading = true;
    });
    builder.GetCase(GetWishlistApi.fulfilled, (state, action) => {
      state.GetWishlistLoading = false;
      state.GetWishlistData = action.payload;
    });
    builder.GetCase(GetWishlistApi.rejected, (state, action) => {
      state.GetWishlistLoading = false;
      state.isError = true;
    });
  },
});


export default GetWishlistSlice.reducer;
