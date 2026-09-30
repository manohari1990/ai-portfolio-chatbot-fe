import axios from "axios";

const apiInstance = axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 10000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
export default apiInstance;