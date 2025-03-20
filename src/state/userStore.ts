import { create } from "zustand";
import { 
    clearLocalStorage, getLocalStorage, 
    removeLocalStorageItem, setLocalStorage 
} from "@/util/storage";
import { userInterface } from "@/typeInterfaces/users.interface";
import apiClient from "@/util/apiClient";


const userEmptyData: userInterface = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    balance: 0,
    role: "user",
    userType: "artist",
    phoneNumber: "",
    country: "",
    status: false,
    location: {
        ip: "",
        usedIps: [],
        city: "",
        region: "",
        country: "",
        isp: "",
        lat: 0,
        lon: 0
    },
    createdAt: "",
    updatedAt: "",
    kyc: {
        isKycSubmitted: false,
        phoneNumber: "",
        securityQuestions: []
    }
};

type _typeInterface_ = {
    accessToken: string;
    refreshToken: string;
    userData: userInterface;
    isLoggedIn: boolean;
    _loginUser: (user: userInterface, accessToken: string, refreshToken: string) => void;
    _handleRefreshToken: (accessToken: string, refreshToken: string) => void;
    _autoLogin: (user: userInterface) => void;
    _logOutUser: () => void;
    _handleRestoreUser: () => void;
    // _handleRefresh: (user?: userInterface, token?: string) => void;
    _signUpUser: (user: userInterface) => void;
    _verifyUser: (user: userInterface) => void;
    _updateUser: (user: userInterface) => void;
    // updatePlayerAsync: () => Promise<void>;
};
  


export const useUserStore = create<_typeInterface_>((set) => ({
    accessToken: "",
    refreshToken: "",
    userData: userEmptyData,
    isLoggedIn: false,
    _loginUser: (user, token, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", token);
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user,
                accessToken: token,
                refreshToken: refreshToken,
                isLoggedIn: true,
            };
        });
    },
    _handleRefreshToken: (accessToken, refreshToken) => {
        setLocalStorage("refreshToken", refreshToken);
        setLocalStorage("access_token", accessToken);
    
        set((_state) => {
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        });
    },
    _autoLogin: (user) => {
        setLocalStorage("user", user);
    
        set((_state) => {
            return {
                userData: user,
                isLoggedIn: true,
            };
        });
    },
    _updateUser: (user) => {
        set((state) => {
            const newUserData = { ...state.userData, ...user };
            setLocalStorage("user", newUserData);
    
            return {
                userData: newUserData,
            };
        });
    },
    _logOutUser: () => {
        removeLocalStorageItem("user");
        removeLocalStorageItem("access_token");
        removeLocalStorageItem("refreshToken");
        clearLocalStorage();

        set((state) => {
            apiClient.post(`/admin/auth/logout`,
                { refresh_token: state.refreshToken }
            ).then();

            return {
                userData: userEmptyData,
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
            };
        });
    },  
    _handleRestoreUser: () => {
        const user = getLocalStorage("user");
        const accessToken = getLocalStorage("access_token");
        const refreshToken = getLocalStorage("refreshToken");

        set((state) => {
            return {
                userData: user || state.userData,
                accessToken: accessToken || state.accessToken,
                refreshToken: refreshToken || state.refreshToken
            }
        });
    },
  
    _signUpUser: (user) => {
        setLocalStorage("user", user);

        set((_state) => {
            return {
                userData: user,
            };
        });
    },
    _verifyUser: () => {},
}));
  