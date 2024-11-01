import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingComponent from './Loading';
import SnackbarToast from './ToastNotification';
import { useSettingStore } from '../state/settingStore';
import { useCheckAuth } from '@/hooks/useCheckAuth';

const ScrollToTop = () => {
    const toastNotification = useSettingStore((state) => state.toastNotification);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const { reAuthUser, isLoading } = useCheckAuth();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // setIsLoading(false);
        reAuthUser();
    }, []);


    return (
        <main>
            { 
                isLoading ? <LoadingComponent /> : <Outlet />
            }

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => _setToastNotification({ ...toastNotification, display: false})}
            />
        </main>
    );
};

export default ScrollToTop;