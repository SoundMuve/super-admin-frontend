import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';



interface _Props {
    // headerTitle: any[],
    // tBodyContent: any[],
    // darkTheme?: boolean,
    // displayDownloadReport?: boolean,
};

const SRAT_DownloadReportBtn: React.FC<_Props> = ({
    // headerTitle, 
    // tBodyContent, displayDownloadReport = false
}) => {

    return (
        <Stack direction={'row'} justifyContent={"right"} sx={{p: 2 }}>
            <Box 
                sx={{
                    p: {xs: "10.18px 19.68px", md: "10px 29px"},
                    borderRadius: {xs: "8.14px", md: "5px"},
                    background: kolors.milk,
                    color: kolors.dark,
                    cursor: "pointer",
                    display: "inline-block",
                    // m: 2,
                    width: "fit-content"
                }}
            >
                <Typography 
                    sx={{
                        fontWeight: '900',
                        fontSize: {xs: "10.18px", md: "15px"},
                        lineHeight: {xs: "8.82px", md: "13px"},
                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                        textAlign: 'center',
                    }}
                > Download Report </Typography>
            </Box>
        </Stack>
    )
}

export default SRAT_DownloadReportBtn