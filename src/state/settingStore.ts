import { create } from "zustand";
import { getLocalStorage, setLocalStorage } from "../util/storage";
import { SnackbarToastInterface } from "../components/ToastNotification";


// const defaultLoading: LoadingModalProps = {
//     display: false,
//     success: false,
//     overlayBgColor: Colors.theme.overlayBgColor,
// };

// const defaultSettings: settingsInterface = {
//     theme: "light",
//     appLoading: defaultLoading,
//     displayPinModal: false
// }

const defaulToastNotification: SnackbarToastInterface = {
    status: "info",
    display: false,
    message: '',
}



type _typeInterface_ = {
    darkTheme: boolean;
    // appLoading: LoadingModalProps;
    // settings: typeof defaultSettings;
    toastNotification: SnackbarToastInterface;

    _setTheme: (theme: boolean) => void;
    _setToastNotification: (toast: SnackbarToastInterface) => void;

    // _setAppLoading: (theme: LoadingModalProps) => void;
    _restoreSettings: () => void;
    // _setSettings: (settings: typeof defaultSettings) => void;
    // _displayPinModal: (display: boolean) => void;
    // _setPinState: (status: boolean) => void;

    // updatePlayerAsync: () => Promise<void>;
};

export const useSettingStore = create<_typeInterface_>((set) => ({
    darkTheme: true,
    // appLoading: defaultLoading,
    // settings: defaultSettings,
    toastNotification: defaulToastNotification,

    _setToastNotification: (toast) => {
        set((_state) => {
            return { toastNotification: toast };
        });
    },

    _setTheme: (theme) => {
        setLocalStorage("settings", {darkTheme: theme});
        set((_state) => {
            return { darkTheme: theme };
        });
    },

    // _setAppLoading: (loading) => {
    //     set((state) => {
    //         const newSettings = {
    //             ...state.settings,
    //             appLoading: loading
    //         };

    //         setLocalStorage("settings", newSettings);
    //         return { settings: newSettings };
    //     });
    // },

    // _setSettings: (settings) => {
    //     setLocalStorage("settings", settings);
    //     // set({settings});

    //     set((state) => {
    //         const newSettings = {
    //             ...state.settings,
    //             ...settings,
    //             pinState: false
    //         };

    //         setLocalStorage("settings", newSettings);
    //         return { settings: newSettings };
    //     });
    // },

    _restoreSettings: () => {
        const settings = getLocalStorage("settings");
        
        set((state) => {
            return { 
                darkTheme: settings?.darkTheme || state.darkTheme,
            };
        });
    },

    // _displayPinModal: (displayPin) => {
    //     set((state) => {
    //         const newSettings = { 
    //             ...state.settings, 
    //             displayPinModal: displayPin,
    //             // pinState: displayPin ? false : state.settings.pinState
    //         };
    //         setLocalStorage("settings", newSettings);

    //         return { settings: newSettings };
    //     });
    // },
  
    // _setPinState: (pinStatus) => {
    //     set((state) => {
    //         const newSettings = { 
    //             ...state.settings, 
    //             pinState: pinStatus,
    //             displayPinModal: pinStatus ? false : state.settings.displayPinModal
    //         };

    //         // setLocalStorage("settings", newSettings);

    //         return { settings: newSettings };
    //     });
    // },
  
}));
