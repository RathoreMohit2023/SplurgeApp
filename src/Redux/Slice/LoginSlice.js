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

      
    });
    
    builder.addCase(LoginApi.rejected, (state, action) => {
      state.LoginLoading = false;
      state.isError = true;
      Alert.alert("Error", "Something went wrong");
    });
  },
});


export default LoginSlice.reducer;
