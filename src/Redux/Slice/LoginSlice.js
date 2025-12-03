import { createSlice } from '@reduxjs/toolkit';
import { LoginApi } from '../Api/LoginApi';
import { Alert } from 'react-native';

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

      const response = action.payload;

      if (response?.token || response?.message?.toLowerCase().includes("success")) {
        Alert.alert("Success", "Login Successfully!");
      } else {
        Alert.alert("Error", response?.message || "Invalid Credentials");
      }
    });
    
    builder.addCase(LoginApi.rejected, (state, action) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Something went wrong");
    });
  },
});


export default LoginSlice.reducer;
