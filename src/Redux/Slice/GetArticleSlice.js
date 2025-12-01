import { createSlice } from '@reduxjs/toolkit';
import { GetArticleApi } from '../Api/GetArticleApi';

const GetArticleSlice = createSlice({
  name: 'GetArticle',
  initialState: {
    GetArticleloading: false,
    isError: false,
    GetArticleData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetArticleApi.pending, (state, action) => {
      state.GetArticleloading = true;
    });
    builder.GetCase(GetArticleApi.fulfilled, (state, action) => {
      state.GetArticleloading = false;
      state.GetArticleData = action.payload;
    });
    builder.GetCase(GetArticleApi.rejected, (state, action) => {
      state.GetArticleloading = false;
      state.isError = true;
    });
  },
});


export default GetArticleSlice.reducer;
