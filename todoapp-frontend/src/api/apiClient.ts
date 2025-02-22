import axios from "axios";

/**
 * @brief Axios instance for API requests.
 * @details Automatically includes JWT token in protected requests.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

/** 
 * @brief Adds JWT token to request headers if available.
 */api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
