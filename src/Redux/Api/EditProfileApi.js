import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, EditProfile_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${EditProfile_Url}`;
 
export const EditProfileApi = createAsyncThunk(
  'EditProfileApi',
  async (PostData, {rejectWithValue}) => {
    
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Content-Type" : "multipart/form-data",
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.post(url, PostData, {
        headers
      });
      console.log("Response from EditProfileApi:", response.data);
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Error in EditProfileApi:', error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);