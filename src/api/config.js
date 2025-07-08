import { getCookies } from "../Utils/cookies";
import axios from "axios";

//base url
export const FetchApi = axios.create({
    baseURL: 'http://api-ecommerce-app.bluetickcoders.com'
})


// for nav tooltip
export const GetRequest = async (url) => {
    const response = await FetchApi.get(url);
    return response.data;
}

export const PostRequest = async (url, data) => {
    const response = await FetchApi.post(url, data);
    return response.data;
}

FetchApi.interceptors.request.use(
        (request)=>{
            let token=getCookies('token')
            request.headers.Authorization=`Bearer ${token}`;
            return request;
        },
        (error)=>{
            console.log(error);
            return Promise.reject(error);
        }
    )
FetchApi.interceptors.response.use(
        (response)=>{
            return response;
        },
        (error)=>{
            console.log(error);
            return Promise.reject(error);
        }
    )