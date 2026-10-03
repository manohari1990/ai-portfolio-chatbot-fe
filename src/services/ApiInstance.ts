import axios from "axios";

const API_CONFIG = {
  auth: import.meta.env.VITE_AUTH_API_URL,
  portfolio: import.meta.env.VITE_PORTFOLIO_API_URL,
};

export const authServiceInstance = axios.create({
        baseURL: API_CONFIG.auth,
        timeout: 10000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
export const portfolioServiceInstance = axios.create({
        baseURL: API_CONFIG.portfolio,
        timeout: 10000,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })