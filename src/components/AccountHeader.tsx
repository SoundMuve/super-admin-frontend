import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
// import { styled } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import ListItemIcon from '@mui/material/ListItemIcon';

import { useUserStore } from '@/state/userStore';
import colors from '@/constants/kolors';
import logo from "@/assets/images/icon.png";


interface _Props {
    // children: React.ReactNode,
    headerSpacing?: boolean,
    menuItems: {
        title: string;
        status: boolean;
        baseLink: string;
        roles: string[];
    }[],
    value: number, 
    setValue: (data: number) => void
}
  

export default function AccountHeaderComponent({
    headerSpacing = false, 
    menuItems, value, setValue
} : _Props) {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const userData = useUserStore((state) => state.userData);
    const _logOutUser = useUserStore((state) => state._logOutUser);
    // const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const [openAccountProfile, setOpenAccountProfile] = useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const mobileDrawerContent = (
        <Box 
            // onClick={handleDrawerToggle} 
            sx={{ 
                p: 2, 
                height: "100%", 
                width: "100%",
                maxWidth: "233px",
                display: "flex", 
                flexDirection: "column", 

                // m: 2,
                color: "#fff", 
                // height: "95%", width: "95%", 
                justifyContent: "center",
                // alignItems: "center",
                bgcolor: "#fff", // colors.milk,
                // borderRadius: "21px"
            }}
        >
            <Box mt={4} mb={7}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Link to="/">
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "25px",
                                            color: colors.tertiary
                                        }}
                                    >Soundmuve</Typography>
                                </Box>

                                <Box >
                                    <img 
                                        src={logo}
                                        alt="SoundMuve logo" 
                                        style={{width: '100%', display: "block"}}
                                    />
                                </Box>
                            </Stack>
                        </Link>
                    </Box>
                    
                    <Box sx={{width: "100%", textAlign: "right"}}>
                        <IconButton onClick={handleDrawerToggle}>
                            <CloseIcon sx={{ color: colors.primary }} />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>

            <List>
                { menuItems.map((item, index) => (
                    item.roles.includes(userData.role) &&
                    <ListItem key={index} disablePadding
                        sx={{
                            borderLeft: index + 1 == value ? `7px solid ${colors.primary}` : "",
                            mb: 1
                        }}
                    >
                        <ListItemButton 
                            onClick={() => {
                                if (item.baseLink) navigate(item.baseLink);

                                setValue(index + 1);
                            }}
                            sx={{
                                bgcolor: index + 1 == value ? "#F0F0F0" : "#fbfbfb",
                            }}
                        >
                            <ListItemText 
                                primary={item.title} 
                                sx={{ 
                                    color: index + 1 == value ? colors.dark : "#7B7979",
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            
            <Box sx={{mt: "auto"}}>

                <Box onClick={() => { _logOutUser(); handleDrawerToggle(); }}
                    sx={{
                        padding: "15px",
                        border: `0.3px solid ${colors.primary}`,
                        borderRadius: "12px",
                        mb: 3,
                    }}
                >
                    <Typography variant='body1'
                        sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "600",
                            fontSize: "13px",
                            lineHeight: "13.06px",
                            // letterSpacing: "-0.08px",
                            textAlign: "center",
                            color: colors.primary,
                        }}
                    >Logout</Typography>
                </Box>
            </Box>
        </Box>
    );

    const accountProfile = (
        <Box
            sx={{
                width: "147px",
                // height: "116px",
                p: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack direction="row" alignItems='center' spacing="10px"
                onClick={() => _logOutUser() }
                sx={{
                    width: "fit-content",
                    bgcolor: "#FBFBFB",
                    padding: "5px 7px",
                    color: "#000",
                    borderRadius: "5px",
                    mt: "auto", mx: "auto",
                    cursor: "pointer"
                }}
            >
                <SettingsPowerIcon sx={{ fontSize: "15px" }} />

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "5px",
                        letterSpacing: "-0.08px"
                    }}
                >Log out</Typography>
            </Stack>

        </Box>
    )


    return (
        <>
            {/* <CssBaseline /> */}
            <AppBar component="nav" position="sticky"
                sx={{ 
                    top: 0,
                    mx: "auto", 
                    backgroundColor: "#fff", 
                    borderRadius: "0 0 10px 10px", 
                    color: "#000000"
                 }} 
            >
                {/* <Toolbar sx={{ px: {xs: 2, md: 5, lg: 12} }}> */}
                <Toolbar sx={{ px: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{color: "#555555", display: {md: "none"} }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* <Box sx={{ display: {xs: "none", md: "initial"} }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Looking for something?"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        console.log(value);
                                    }}
                                />
                            </Search>
                        </Box> */}
                    </Stack>


                    <Box sx={{flexGrow: 1, display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
                        <Stack spacing={2} direction="row" alignItems="center" >
                            {/* <IconButton sx={{color: "#000"}}>
                                <NotificationsOutlinedIcon />
                            </IconButton> */}

                            <Box sx={{ alignSelf: "center", display: {xs: "none", md: "initial"} }}>
                                <ClickAwayListener onClickAway={() => setOpenAccountProfile(false)}>
                                    <div>
                                        <Tooltip title={accountProfile} arrow color='primary' placement="bottom-start" 

                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={() => setOpenAccountProfile(false)}
                                            open={openAccountProfile}

                                            slotProps={{
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: "#272727",
                                                    },
                                                },
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" onClick={() => setOpenAccountProfile(true) }>
                                                <Box>
                                                    <IconButton sx={{color: "#000"}}>
                                                        <Avatar 
                                                            alt={ `${ userData.firstName } ${ userData.lastName}` } 
                                                            // src="/static/images/avatar/2.jpg" 
                                                        />
                                                    </IconButton>
                                                </Box>

                                                <Typography>{ `${ userData.firstName } ${ userData.lastName}` } </Typography>

                                                <ArrowDropDownIcon />
                                            </Stack>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </Box>
                        </Stack>
                    </Box>

                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    anchor='left'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: "100%", 
                            background: "transparent" 
                        },
                        zIndex: 9999
                    }}
                >
                    {mobileDrawerContent}
                </Drawer>
            </nav>

            { headerSpacing ? <Toolbar /> : <></> }
        </>
    );
}
