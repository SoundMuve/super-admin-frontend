import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import SideNav from '@/components/account/SideNav';
import Stack from '@mui/material/Stack';

import AccountHeaderComponent from '@/components/AccountHeader';
import { useUserStore } from '@/state/userStore';
import Container from '@mui/material/Container';


const AccountLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    // if (!isLoggedIn) return <Navigate replace to={"/auth/login"} />;

    const [value, setValue] = useState(1);

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname.includes("admin/revenue")) setValue(2);
        if (pathname.includes("admin/analytics")) setValue(3);
        if (pathname.includes("admin/users")) setValue(4);
        if (pathname.includes("admin/promotions")) setValue(5);
        if (pathname.includes("admin/uploads")) setValue(6);
        if (pathname.includes("admin/coupon")) setValue(7);
        if (pathname.includes("admin/contacts")) setValue(8);
        if (pathname.includes("admin/newsletter")) setValue(9);
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
            baseLink: "/admin/revenue"
        },
        {
            title: 'Music analytics',
            status: value == 3 ? true : false,
            baseLink: "/admin/analytics"
        },
        {
            title: 'Users',
            status: value == 4 ? true : false,
            baseLink: "/admin/users"
        },
        {
            title: 'Promotions',
            status: value == 5 ? true : false,
            baseLink: "/admin/promotions"
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
        {
            title: 'Contact Messages',
            status: value == 8 ? true : false,
            baseLink: "/admin/contacts"
        },
        {
            title: 'Newsletter',
            status: value == 9 ? true : false,
            baseLink: "/admin/newsletter"
        },
    ];


    return (
        <Stack direction="row" justifyContent="space-between">
            <Box sx={{ display: {xs: "none", md: "initial"} }} >
                <SideNav 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                />
            </Box>

            <Container component="main" maxWidth="lg"
                sx={{ 
                    // flexGrow: 1, 
                    // px: 3, 
                    maxWidth: { xs: "100vw", md: "calc(100vw - 233px)" }
                }}
            >
                <AccountHeaderComponent 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                />
                
                <Box>
                    { 
                        isLoggedIn ? 
                        <Outlet />
                        : 
                        <Navigate replace to={"/auth/login"} />
                    }
                </Box>
            </Container>
        </Stack>
    );
};

export default AccountLayout;