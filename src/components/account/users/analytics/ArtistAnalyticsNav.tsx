import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';


interface _Props {
    currentPage: "balance-history" | "sales-report" | "analytics-reach",
    setCurrentPage: (page: "balance-history" | "sales-report" | "analytics-reach") => void,
}

const ArtistAnalyticsNavComponent: React.FC<_Props> = ({
    currentPage, setCurrentPage,
}) => {


    return (
        <Box>
            <Stack direction={"row"} spacing={{xs: "15px", md: "30px"}}>
                <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        border: `1px solid ${kolors.primary}`,
                        background: currentPage == "balance-history" ? kolors.primary : kolors.bg,
                        color: currentPage == "balance-history" ? kolors.milk : kolors.primary,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setCurrentPage("balance-history") }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Balance History </Typography>
                </Box>

                <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        border: `1px solid ${kolors.primary}`,
                        background: currentPage == "sales-report" ? kolors.primary : kolors.bg,
                        color: currentPage == "sales-report" ? kolors.milk : kolors.primary,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setCurrentPage("sales-report") }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Sales Report </Typography>
                </Box>

                {/* <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        // background: kolors.bg,
                        // color: darkTheme ? "#000" : "#313131",
                        border: `1px solid ${kolors.primary}`,
                        background: currentPage == "analytics-reach" ? kolors.primary : kolors.bg,
                        color: currentPage == "analytics-reach" ? kolors.milk : kolors.primary,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => navigate(`/account/${accountType}/analytics-reach`) }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Reach </Typography>
                </Box> */}
            </Stack>
        </Box>
    )
}

export default ArtistAnalyticsNavComponent;