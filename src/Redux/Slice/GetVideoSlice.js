import { createSlice } from '@reduxjs/toolkit';
import { GetvideoApi } from '../Api/GetVideoApi';

const GetVideoSlice = createSlice({
  name: 'GetVideo',
  initialState: {
    GetVideoLoading: false,
    isError: false,
    GetVideoData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetvideoApi.pending, (state, action) => {
      state.GetVideoLoading = true;
    });
    builder.GetCase(GetvideoApi.fulfilled, (state, action) => {
      state.GetVideoLoading = false;
      state.GetVideoData = action.payload;
    });
    builder.GetCase(GetvideoApi.rejected, (state, action) => {
      state.GetVideoLoading = false;
      state.isError = true;
    });
  },
});


export default GetVideoSlice.reducer;
