import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";

// const API_BASE_URL = "https://api-admin.bondyt.com/";
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach token before every request
apiClient.interceptors.request.use(
    (config) => {
        const accessToken  = useUserStore.getState().accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { refreshToken, _handleRefreshToken, _logOutUser } = useUserStore.getState();
        const originalRequest = error.config;

        if (error.response?.status === 419 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // console.log("Access token expired. Refreshing...");
                // console.log("Current refresh token:", refreshToken); // Log refresh token

                const refreshResponse = (await axios.post(`${API_BASE_URL}/auth/refresh`,
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        }
                    }
                )).data;

                if (refreshResponse.status) {
                    // const user = refreshResponse.result.user;
                    const token = refreshResponse.result.newToken;
                    _handleRefreshToken(token, refreshToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${token.access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed, logging out...");
                _logOutUser();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;


export function apiErrorResponse(error: any, defaultErrorMsg = "Ooops and error occurred!", displayToastMsg = true) {
    const _setToastNotification  = useSettingStore.getState()._setToastNotification;
    
    const err = error.response && error.response.data ? error.response.data : error;
    console.log(err);
  
    const messageRes = err.errors && err.length ? err[0].message : err.message || defaultErrorMsg;
  
    _setToastNotification({
        display: displayToastMsg,
        status: "error",
        message: messageRes
    });
  
    return messageRes;
}