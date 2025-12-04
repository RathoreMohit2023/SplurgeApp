import { createSlice } from '@reduxjs/toolkit';
import { DeleteTransactionApi } from '../Api/DeleteTransectionApi';

const DeleteTransectionSlice = createSlice({
  name: 'DeleteTransection',
  initialState: {
    DeleteTransectionLoading: false,
    isError: false,
    DeleteTransectionData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteTransactionApi.pending, (state, action) => {
      state.AddTransactionLoading = true;
    });
    builder.addCase(DeleteTransactionApi.fulfilled, (state, action) => {
      state.AddTransactionLoading = false;
      state.AddTransactionData = action.payload;
    });
    builder.addCase(DeleteTransactionApi.rejected, (state, action) => {
      state.AddTransactionLoading = false;
      state.isError = true;
    });
  },
});
export default DeleteTransectionSlice.reducer;
