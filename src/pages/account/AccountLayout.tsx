import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import SideNav from '@/components/account/SideNav';
import Stack from '@mui/material/Stack';

import AccountHeaderComponent from '@/components/AccountHeader';
import { useUserStore } from '@/state/userStore';


const AccountLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    
    if (!isLoggedIn) return <Navigate replace to={"/auth/login"} />;

    const [value, setValue] = useState(1);

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname.includes("admin/uploads")) setValue(6);
        if (pathname.includes("admin/coupon")) setValue(7);
    }, [pathname]);


    const menuItems = [
        {
            title: 'Dashboard',
            status: value == 1 ? true : false,
            baseLink: "/admin/"
        },
        {
            title: 'Revenue area',
            status: value == 2 ? true : false,
            baseLink: ""
        },
        {
            title: 'Music analytics',
            status: value == 3 ? true : false,
            baseLink: ""
        },
        {
            title: 'Users',
            status: value == 4 ? true : false,
            baseLink: ""
        },
        {
            title: 'Promotions',
            status: value == 5 ? true : false,
            baseLink: ""
        },
        {
            title: 'Uploads',
            status: value == 6 ? true : false,
            baseLink: "/admin/uploads"
        },
        {
            title: 'Coupons',
            status: value == 7 ? true : false,
            baseLink: "/admin/coupons"
        },
    ];


    return (
        <Stack direction="row" justifyContent="space-between">
            <Box sx={{ display: {xs: "none", md: "initial"} }}>
                <SideNav 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                />
            </Box>

            <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                <AccountHeaderComponent 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                />
                
                <Box>
                    <Outlet />
                </Box>
            </Box>
        </Stack>
    );
};

export default AccountLayout;