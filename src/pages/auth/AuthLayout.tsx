import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/state/userStore';
// import { useCheckAuth } from '@/hooks/useCheckAuth';
// import LoadingComponent from '@/components/Loading';
// import { useEffect } from 'react';

const AuthLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    // const { isLoading } = useCheckAuth();

    if (isLoggedIn) {
        return <Navigate replace  to={"/admin/"} />;
    } 

    // useEffect(() => {
    //     // setIsLoading(false);
    //     reAuthUser();
    // }, []);


    return (
        <main>
            {/* { 
                isLoading ? <LoadingComponent /> : <Outlet />
            } */}

            <Outlet />
        </main>
    );
};

export default AuthLayout;