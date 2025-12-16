import { createSlice } from '@reduxjs/toolkit';
import { LoginApi, GoogleLoginApi } from '../Api/LoginApi';
import { Alert } from 'react-native';

const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    LoginLoading: false,
    isError: false,
    LoginData: null, // array se better object
  },

  extraReducers: (builder) => {
    /* ================= NORMAL LOGIN ================= */
    builder.addCase(LoginApi.pending, (state) => {
      state.LoginLoading = true;
      state.isError = false;
    });

    builder.addCase(LoginApi.fulfilled, (state, action) => {
      state.LoginLoading = false;
      state.LoginData = action.payload;
    });

    builder.addCase(LoginApi.rejected, (state) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Login failed");
    });

    /* ================= GOOGLE LOGIN ================= */
    builder.addCase(GoogleLoginApi.pending, (state) => {
      state.LoginLoading = true;
      state.isError = false;
    });

    builder.addCase(GoogleLoginApi.fulfilled, (state, action) => {
      state.LoginLoading = false;
      state.LoginData = action.payload; // 👈 SAME STATE
    });

    builder.addCase(GoogleLoginApi.rejected, (state) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Google login failed");
    });
  },
});

export default LoginSlice.reducer;
