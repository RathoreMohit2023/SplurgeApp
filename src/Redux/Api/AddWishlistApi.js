import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddWishlist_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${AddWishlist_Url}`;

export const AddWishlistApi = createAsyncThunk(
  'AddWishlistApi',
  async (PostData) => {
    
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
      console.log("Response from AddWishlistApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Error in AddWishlistApi:', error.response.data);
    }
  }
);