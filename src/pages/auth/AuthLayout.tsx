import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/state/userStore';
// import LoadingComponent from '@/components/Loading';


const AuthLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    // const { isLoading } = useCheckAuth();

    // useEffect(() => {
    //     // setIsLoading(false);
    //     reAuthUser();
    // }, []);


    return (
        <main>
            {
                isLoggedIn ? <Navigate replace  to={"/admin/"} /> 
                : <Outlet />
            }
        </main>
    );
};

export default AuthLayout;