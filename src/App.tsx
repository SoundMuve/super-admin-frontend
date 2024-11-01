import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { useUserStore } from "./state/userStore";
import { useSettingStore } from "./state/settingStore";

function App() {
    const _handleRestoreUser = useUserStore((state) => state._handleRestoreUser);
    const _restoreSettings = useSettingStore((state) => state._restoreSettings);
        
    const handleRefreshNredirect = () => {
        _restoreSettings();
        _handleRestoreUser();
    }

    useEffect(() => {
        handleRefreshNredirect();
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;