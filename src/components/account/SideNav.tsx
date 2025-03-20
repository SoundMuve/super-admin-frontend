import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { useSettingStore } from '@/state/settingStore';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import colors from '@/constants/kolors';
import { Link, useNavigate } from 'react-router-dom';
import logo from "@/assets/images/icon.png";
import Stack from '@mui/material/Stack';
import { useUserStore } from '@/state/userStore';


interface _Props {
    menuItems: {
        title: string;
        status: boolean;
        baseLink: string;
        roles: string[];
    }[],
    value: number, 
    setValue: (data: number) => void
};

const SideNav: React.FC<_Props> = ({
    menuItems, value, setValue
}) => {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);


    return (
        <Box 
            sx={{ 
                width: "233px",
                height: "100dvh",
                overflow: "auto",

                // borderRight: "1px solid #666666",
                // flexShrink: 0,
                background: "#fff",
                position: "sticky", 
                top: 0
            }}
        >
            <Box px={1.5} mt={5} mb={4}>
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

            <List>
                { menuItems.map((item, index) => (
                    item.roles.includes(userData.role) &&
                    <ListItem key={index} disablePadding
                        sx={{
                            borderLeft: index + 1 == value ? `7px solid ${colors.primary}` : "",
                            mb: 1
                        }}
                    >
                        <ListItemButton onClick={() => {
                            if (item.baseLink) navigate(item.baseLink);

                            // setValue(index + 1);
                            setValue(index + 1);
                        }}>
                        {/* <ListItemButton disableGutters disableRipple disableTouchRipple sx={{cursor: "default"}}> */}
                            {/* <ListItemIcon>
                                {
                                    index + 1 < value ? (
                                        <CheckCircleIcon sx={{ color: "green" }} />
                                    ) : (
                                        <Box
                                            sx={{
                                                border: `1px solid ${colors.primary}`,
                                                borderRadius: "100%",
                                                width: "20px",
                                                height: "20px",
                                                display: "flex",
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant='body2'
                                                sx={{
                                                    color: colors.primary,
                                                    textAlign: "center",
                                                    fontWeight: "400",
                                                    fontSize: "16.35px",
                                                    lineHeight: "33.85px",
                                                    letterSpacing: "-0.11px",
                                                }}
                                            > { index + 1 } </Typography>
                                        </Box>
                                    )
                                }
                            </ListItemIcon> */}

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
        </Box>
    );
}

export default SideNav;