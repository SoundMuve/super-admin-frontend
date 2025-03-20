import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
// import { localApiEndpoint } from "@/util/resources";
import { getLocalStorage } from "@/util/storage";
import apiClient, { apiErrorResponse } from "@/util/apiClient";

export function useCheckAuth() {
    const _autoLogin = useUserStore((state) => state._autoLogin);
    const _logOutUser = useUserStore((state) => state._logOutUser);
    const _updateUser = useUserStore((state) => state._updateUser);
    const _handleRefreshToken = useUserStore((state) => state._handleRefreshToken);
    const [isLoading, setIsLoading] = useState(true);

    const reAuthUser = useCallback(() => {
        checkUserAuthState()
    }, []);

    const checkUserAuthState = async () => {
        // const access_token = getLocalStorage("access_token")
        const refresh_token = getLocalStorage("refreshToken");
        const user_data = getLocalStorage("user");

        if (!refresh_token || !user_data ) {
            setIsLoading(false);
            return;
        }

        // if (!pathname.includes("/account") || !pathname.includes("/auth")) {
        //     setIsLoading(false);
        // }
        
        try {
            // const response = (await apiClient.get(`/auth/reValidateUserAuth`, {
            const response = (await apiClient.post(`/auth/refresh`, 
                { refresh_token: refresh_token },
                {
                    headers: {
                        // Authorization: `Bearer ${access_token}`,
                        refresh: `Bearer ${refresh_token}`
                    }
                }
            )).data;
            console.log(response);

            if (response.status) {
                _handleRefreshToken(response.result.newToken, refresh_token);
                _updateUser(response.result.user);
                _autoLogin(response.result.user || user_data);
            }
            setIsLoading(false);
        
            return true;
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);

            setIsLoading(false);
            _logOutUser();
    
            return false;
        }
    }
 

    return {
        isLoading,
        setIsLoading,
        reAuthUser
    }
}



