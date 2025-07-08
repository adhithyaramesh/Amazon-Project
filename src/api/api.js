import axios from "axios";

const FetchApi = axios.create({
    baseURL: '/api'
})

export default FetchApi;