import { createSlice } from '@reduxjs/toolkit';
import { LoginApi } from '../Api/Login';

const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoginLoading: false,
    isError: false,
    LoginData: [],
  },

  extraReducers: (builder) => {
    builder.addCase(LoginApi.pending, (state, action) => {
      state.LoginLoading = true;
    });
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      state.LoginLoading = false;
      state.LoginData = action.payload;
    });
    builder.addCase(LoginApi.rejected, (state, action) => {
      state.LoginLoading = false;
      state.isError = true;
    });
  },
});


export default LoginSlice.reducer;
