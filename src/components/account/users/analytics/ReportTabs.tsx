import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';


interface _Props {
    // children: React.ReactNode,
    reportType: string,
    setReportType: (report: 'Months' | 'Location' | 'Albums' | 'Singles') => void,
}

const ReportTabsComponent:React.FC<_Props> = ({reportType, setReportType}) => {

    return (
        <Box sx={{mb: "40px"}}>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"15px"}>

                <Box 
                    sx={{
                        p: "10px",
                        // border: reportType == 'Release' ? "1px solid #FBFBFB" : 'none',
                        borderRadius: "11px",
                        bgcolor: reportType == 'Singles' ? kolors.tertiary : kolors.secondary,
                        color: kolors.milk,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setReportType('Singles') }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "18px"},
                            lineHeight: {xs: "8.82px", md: "24px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Singles </Typography>
                </Box>

                <Box 
                    sx={{
                        p: "10px",
                        // border: reportType == 'Albums' ? "1px solid #FBFBFB" : 'none',
                        borderRadius: "11px",
                        bgcolor: reportType == 'Albums' ? kolors.tertiary : kolors.secondary,
                        color: kolors.milk,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setReportType('Albums') }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "18px"},
                            lineHeight: {xs: "8.82px", md: "24px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Albums </Typography>
                </Box>


                <Box 
                    sx={{
                        p: "10px",
                        // border: reportType == 'Location' ? "1px solid #FBFBFB" : 'none',
                        borderRadius: "11px",
                        bgcolor: reportType == 'Location' ? kolors.tertiary : kolors.secondary,
                        color: kolors.milk,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setReportType('Location') }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "18px"},
                            lineHeight: {xs: "8.82px", md: "24px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Location </Typography>
                </Box>

                <Box 
                    sx={{
                        p: "10px",
                        // border: reportType == 'Months' ? "1px solid #FBFBFB" : 'none',
                        borderRadius: "11px",
                        bgcolor: reportType == 'Months' ? kolors.tertiary : kolors.secondary,
                        color: kolors.milk,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => setReportType('Months') }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "18px"},
                            lineHeight: {xs: "8.82px", md: "24px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Months </Typography>
                </Box>
            
            </Stack>
        </Box>
    )
}

export default ReportTabsComponent