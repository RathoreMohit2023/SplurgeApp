import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, GetTransection_Url } from '../NWConfig';

const url = `${BASE_URL}${GetTransection_Url}`;

export const GetTransectionApi = createAsyncThunk(
  'GetTransection',
  async (token) => {
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    }
    try {
      const response = await axios.get(url, {
        headers,
      });
      console.log("GetTransectionApi response:", response.data);
      
      const result = response.data;
      return result;
    } catch (error) {
      console.error("GetTransection Api error:", error);
    }
  }
);