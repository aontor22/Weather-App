import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY || "abdeb32ec42446a1b9752120251510";
const BASE_URL = "https://api.weatherapi.com/v1";

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    }
});

apiClient.interceptors.response.use(
    (response) => {
        return {
            ok: true,
            status: response.status,
            data: response.data,
            error: null,
        };
    },
    (error) => {
        const status = error.response?.status || 0;
        const message = error.response?.data?.error?.message || error.message || 'An unknown error occurred';

        return Promise.resolve({
            ok: false,
            status: status,
            data: null,
            error: message,
        });
    }
);

export default apiClient;