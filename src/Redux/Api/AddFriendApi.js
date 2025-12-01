import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AddFriend_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${AddFriend_Url}`;

export const AddFriendApi = createAsyncThunk(
  'AddFriendApi',
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
      console.log("Response from AddFriendApi:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.log('Error in AddFriendApi:', error.response.data);
    }
  }
);