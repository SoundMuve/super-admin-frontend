import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import kolors from '@/constants/kolors';


interface _Props {
    // children: React.ReactNode,
    totalRevenue: number,
    streams: number,
    streamTime: string | number,
}

const SingleSongDspOverviewComponent: React.FC<_Props> = ({
    totalRevenue, streams, streamTime
}) => {

    return (
        <Box
            sx={{
                background: kolors.secondary,
                backdropFilter: "blur(12.5px)",
                WebkitBackdropFilter: "blur(12.5px)",
                borderRadius: {xs: "13.43px", md: "37px"},
                height: {xs: "117.98px", md: "127px"},

                display: "flex",
                flexDirection: "column",
                p: {xs: "15px", md: "50px"},
                mt: 3
            }}
        >
            <Stack mt="auto" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: '12px', md: '24px'},
                            lineHeight: {xs: '8.71px', md: '24px'}
                        }}
                    >{ currencyDisplay(totalRevenue) }</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: '10px', md: '17px'},
                            color: "#797979"
                        }}
                    >Total Revenue</Typography>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: '12px', md: '24px'},
                            lineHeight: {xs: '8.71px', md: '24px'}
                        }}
                    >{ formatedNumber(streams) } </Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: '10px', md: '17px'},
                            color: "#797979"
                        }}
                    >Streams</Typography>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: '12px', md: '24px'},
                            lineHeight: {xs: '8.71px', md: '24px'}
                        }}
                    >{ formatedNumber(Number(streamTime)) }hrs</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: '10px', md: '17px'},
                            color: "#797979"
                        }}
                    >Stream time</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default SingleSongDspOverviewComponent