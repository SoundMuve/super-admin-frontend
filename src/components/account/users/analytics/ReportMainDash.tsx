import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import kolors from '@/constants/kolors'
import { displayDateMonthYear, displayDateRange } from '@/util/dateTime'
import { currencyDisplay, formatedNumber } from '@/util/resources'
// import DateRangeMonthsYearBasicMenu from '../DateRange_MonthsYear'
// import { useUserStore } from '@/state/userStore'
import DateRangeMonthsYearBasicMenu from './DateRange_MonthsYear'
import { useGeneralStore } from '@/state/generalStore'


interface _Props {
    // children: React.ReactNode,

    dateRangeValue: {
        startDate: string,
        endDate: string,
    };
    setDateRangeValue: (value: any) => void;

    totalEarnedBalance: string | number, // $13,715.98
    albums: string | number, // $13,715.98
    // sold: string | number, // 84
    singles: string | number, // $54.84
    // streams: string | number, // $54.84
    streamRevenue: string | number, // $54.84
    streamPlays: string | number, // 4,000,000
    
    albumSold: string | number,
    singlesSold: string | number,
}

const ReportMainDashComponent:React.FC<_Props> = ({
    totalEarnedBalance, albums, singles, streamRevenue, streamPlays,
    albumSold, singlesSold,
    setDateRangeValue, dateRangeValue
}) => {
    // const userData = useUserStore((state) => state.userData);
    const selectedUserDetails = useGeneralStore((state) => state.selectedUserDetails);


    return (
        <Box
            sx={{
                border: `1px solid ${kolors.dark}`,
                bgcolor: kolors.secondary,
                borderRadius: "13px",
                p: {xs: "15px", md: "25px"},
                mb: {xs: "50px", md: "70px"}
            }}
        >
            <Stack direction={"row"} gap={"20px"} justifyContent={"space-between"} flexWrap="wrap">
                <DateRangeMonthsYearBasicMenu 
                    dateRangeValue={dateRangeValue}
                    setDateRangeValue={setDateRangeValue}
                    // setDateRangeValue={(value) => setDateRangeValue(value)}
                />

                <Typography>
                    <Typography component="span"
                        sx={{
                            color: "#666666",
                            fontWeight: "500",
                            fontSize: {xs: "12px", md: "14px"}
                        }}
                    >Available Bal: </Typography>

                    <Typography component="span"
                        sx={{
                            color: "green",
                            fontWeight: "900",
                            fontSize: {xs: "15px", md: "18px"}
                        }}
                    >{ currencyDisplay(Number(selectedUserDetails.balance)) }</Typography>
                </Typography>
            </Stack>

            {/* Mobile View Only */}
            <Box 
                sx={{ 
                    mb: "30px", 
                    display: {xs: "initial", md: "none"}, 
                    // justifyContent: "right", 
                    // alignItems: "baseline",
                    // gap: "5px",

                    textAlign: "right"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        // lineHeight: "8px",
                        color: "#666666",
                    }}
                >Total Earned </Typography>

                <Typography variant='body1'
                    sx={{
                        fontWeight: "800",
                        fontSize: "18px",
                        lineHeight: "24px",
                        color: "#C8F452",
                    }}
                >{ currencyDisplay(Number(totalEarnedBalance)) }</Typography>

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "10px",
                        // lineHeight: "8px",
                        color: "#4C4C4C",
                    }}
                // >Balance</Typography>
                >{ displayDateMonthYear(dateRangeValue.startDate) } - { displayDateRange(dateRangeValue.endDate) }</Typography>
            </Box>

            <Stack direction={"row"} spacing={"20px"} mt={{xs: 0, md: "60px"}} justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} spacing={{xs: "15px", md: "20px"}} justifyContent={{xs: "space-between", md: "initial"}} >
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Albums</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: kolors.milk,
                                color: kolors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography 
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ formatedNumber(Number(albums)) } </Typography>
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ formatedNumber(Number(albumSold)) } Sold</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Singles</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: kolors.milk,
                                color: kolors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ formatedNumber(Number(singles)) }</Typography>
                        </Box>

                        <Typography variant='body1'
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ singlesSold } Sold</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Streams</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: kolors.milk,
                                color: kolors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography 
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ currencyDisplay(Number(streamRevenue)) }</Typography>
                        </Box>

                        <Typography variant='body1'
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ formatedNumber(Number(streamPlays)) } Plays</Typography>
                    </Box>
                </Stack>

                {/* Desktop view only */}
                <Box sx={{ display: {xs: "none", md: "initial"} }}>
                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: "13.54px", md: "18px"},
                            lineHeight: {xs: "18.06px", md: "24px"},
                            color: "#666666",
                            mb: 1
                        }}
                    >Total Earned</Typography>

                    <Box 
                        sx={{
                            p: {xs: "10px 15px", md: "10px 37px"},
                            borderRadius: "7px",
                            bgcolor: "#33500B",
                            color: "#C8F452",
                            display: "inline-block"
                        }}
                    >
                        <Typography 
                            sx={{
                                fontWeight: '900',
                                fontSize: {xs: "10.18px", md: "18px"},
                                lineHeight: {xs: "8.82px", md: "24px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                textAlign: 'center',
                            }}
                        >{ currencyDisplay(Number(totalEarnedBalance)) }</Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: "13.54px", md: "18px"},
                            lineHeight: {xs: "18.06px", md: "24px"},
                            color: "#666666",
                            mt: 1
                        }}
                    >{ displayDateMonthYear(dateRangeValue.startDate) } - { displayDateRange(dateRangeValue.endDate) }</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default ReportMainDashComponent