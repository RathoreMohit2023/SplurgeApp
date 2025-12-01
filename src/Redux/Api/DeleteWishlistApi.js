import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, DeleteWishlist_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${DeleteWishlist_Url}`;

export const DeleteWishlistApi = createAsyncThunk(
  'DeleteWishlist',
  async (id) => {
    const token = await AsyncStorage.getItem('Token');
    const parsedToken = JSON.parse(token);
    const headers = {
        "Authorization": `Bearer ${parsedToken}`, 
    }
    try {
      const response = await axios.delete(url + id, {
        headers
      });

      const result = response.data;
      console.log("DeleteWishlistApi result", result);
      
      return result;
    } catch (error) {
      console.error("DeleteWishlistApi error:", error.response.data);
     throw error;
    }
  }
);