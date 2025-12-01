import { createAsyncThunk } from "node_modules/@reduxjs/toolkit/dist";
import axios from "node_modules/axios";
import { BASE_URL, Forgote_Url } from "../NWConfig";
import AsyncStorage from "node_modules/@react-native-async-storage/async-storage/lib/typescript";

const Url = `${BASE_URL}${Forgote_Url}`;

export const forgoteApi = createAsyncThunk(
    'ForgoteApi',
    async (PosttData) => {

        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token)
        const headers = {
            "Content-Type" : "multiPart/form-data",
            "Authorization" : `Bearer ${parseToken}`
        }

        try{
            const response = await axios.post(Url, PosttData, {
                headers
            })
            console.log("Response from LoginApi:", response.data);
      
            const result = response.data;
            return result;
        }
        catch(error){
            console.log('Error in ForgoteApi:', error.response.data)
        }
    }
);