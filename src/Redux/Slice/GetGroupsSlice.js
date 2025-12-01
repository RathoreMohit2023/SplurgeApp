import { createSlice } from '@reduxjs/toolkit';
import { GetGroupsApi } from '../Api/GetGroupsAPi';

const GetGroupsSlice = createSlice({
  name: 'GetGroups',
  initialState: {
    GetGroupsLoading: false,
    isError: false,
    GetGroupsData: [],
  },

  extraReducers: (builder) => {
    builder.GetCase(GetGroupsApi.pending, (state, action) => {
      state.GetGroupsLoading = true;
    });
    builder.GetCase(GetGroupsApi.fulfilled, (state, action) => {
      state.GetGroupsLoading = false;
      state.GetGroupsData = action.payload;
    });
    builder.GetCase(GetGroupsApi.rejected, (state, action) => {
      state.GetGroupsLoading = false;
      state.isError = true;
    });
  },
});


export default GetGroupsSlice.reducer;
