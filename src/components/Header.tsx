// import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// // import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

import { contentWidth } from '../util/mui';
import logo from "@/assets/images/logo.png";
// import icon from "@/assets/images/icon.png";
// import colors from '@/constants/kolors';
// import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
// import { useUserStore } from '@/state/userStore';


// const drawerWidth = 240;

export default function HeaderComponent() {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const pathname = location.pathname;

    // const [mobileOpen, setMobileOpen] = React.useState(false);
    // const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    // const handleDrawerToggle = () => {
    //     setMobileOpen((prevState) => !prevState);
    // };


    return (
        <>
            {/* <CssBaseline /> */}
            <AppBar component="nav" position="sticky"
                sx={{
                    top: 0,
                    // zIndex: 9999, // this is to make the testiomianls not to show upto of the header
                    mx: "auto", 
                    backgroundColor: "#000", 
                    borderRadius: 23.5, 
                    ...contentWidth
                    // width: {xs: "calc(100% - 20px)", md: "calc(100% - 30px)", md: "calc(100% - 40px)" },
                }}
            >
                <Toolbar>
                    <Stack direction="row" justifyContent="space-around" width="100%" alignItems="center" spacing={10}>
                        <Link to="/">
                            <img src={logo} alt="SoundMuve logo" style={{width: 130}} />
                        </Link>


                        <Box>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Box sx={{ alignSelf: "center" }}>
                                        <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
                                            {/* <LanguageTranslate /> */}
                                        </Box>
                                    </Box>

                                </Stack>
                            </Box>

                            <Box sx={{ ml: 2, display: { md: 'none' } }}>
                                {/* <IconButton
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                    sx={{color: "#fff"}}
                                >
                                    <MenuIcon />
                                </IconButton> */}
                            </Box>
                        </Box>
                    </Stack>
                    
                
                </Toolbar>
            </AppBar>
        </>
    );
}
