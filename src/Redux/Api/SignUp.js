import { createAsyncThunk } from "node_modules/@reduxjs/toolkit/dist";
import axios from "node_modules/axios";
import { BASE_URL, SignUp_Url } from "../NWConfig";
import AsyncStorage from "node_modules/@react-native-async-storage/async-storage/lib/typescript";

const Url = `${BASE_URL}${SignUp_Url}`;

// const SignUpApi = () => {

// }

// export default SignUpApi;

export const SignUpApi = createAsyncThunk(
    'SignUpApi',
    async (PostData) => {
        const token = await AsyncStorage.getItem('Token');
        const parsedToken = JSON.parse(token);
        const headers = {
            "Content-Type" : "multiPart form-data",
            "Authorization" : `Bearer ${parsedToken}`
        }

        try{
            const response = await axios.post(Url, PostData, { headers});
            console.log("Response from LoginApi:", response.data);

            const result = response.data
            return result;
        }
        catch(error){
            console.log('Error in SignUpApi:', error.response.data);
        }
    }
);