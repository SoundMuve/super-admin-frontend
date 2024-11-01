import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
// import { localApiEndpoint } from "@/util/resources";
import { getLocalStorage } from "@/util/storage";

export function useCheckAuth() {
    const _autoLogin = useUserStore((state) => state._autoLogin);
    const _logOutUser = useUserStore((state) => state._logOutUser);
    const _handleRefreshToken = useUserStore((state) => state._handleRefreshToken);
    const [isLoading, setIsLoading] = useState(true);

    const reAuthUser = useCallback(() => {
        checkUserAuthState()
    }, []);
    
    const checkUserAuthState = async () => {
        const access_token = getLocalStorage("access_token")
        // const refresh_token = getLocalStorage("refreshToken");
        const user_data = getLocalStorage("user");
    
        if (!access_token || !user_data ) {
            setIsLoading(false);
            return;
        }

        // setIsLoading(false);
        // return;

    
        // if (!pathname.includes("/admin") || !pathname.includes("/auth")) {
        //     setIsLoading(false);
        // }
        
        try {
            const response = (await axios.get(`${apiEndpoint}/auth/reValidateUserAuth`, {
            // const response = (await axios.get(`${localApiEndpoint}/auth/reValidateUserAuth`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    // refresh: `Bearer ${refresh_token}`
                }
            })).data;
            // console.log(response);

            if (response.accessToken && response.refreshToken) {
                // _handleRefreshToken(response.accessToken, response.refreshToken)
                _handleRefreshToken(response.accessToken)
            }

    
            setIsLoading(false);
            if (user_data && access_token) _autoLogin(user_data);
    
            return true;
        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);
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



