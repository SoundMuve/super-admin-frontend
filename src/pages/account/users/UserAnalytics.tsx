import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import kolors from '@/constants/kolors';
import { copyToClipboard } from '@/util/copyNshare';
import { useGeneralStore } from '@/state/generalStore';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import LoadingDataComponent from '@/components/LoadingData';
import BackNavigationArrowBtn from '@/components/BackNavigationArrowBtn';
import SalesReport from '@/components/account/users/analytics/SalesReport';
import BalanceHistory from '@/components/account/users/analytics/BalanceHistory';
import ArtistAnalyticsNavComponent from '@/components/account/users/analytics/ArtistAnalyticsNav';


export default function UserAnalytics() {
    const navigate = useNavigate();
    const {_id} = useParams();

    const [analyticsViewType, setAnalyticsView] = useState<'balance-history' | 'sales-report' | 'analytics-reach'>('sales-report');

    const selectedUserDetails = useGeneralStore((state) => state.selectedUserDetails);

    const {
        isSubmitting,

        getUserById,

        rlArtistsCount,
        releaseCount,
    } = useUsersHook();

    useEffect(() => {
        const user_id = selectedUserDetails._id || _id || '';
        
        if (user_id) {
            if (!selectedUserDetails._id) {
                getUserById(user_id);
            }
        } else {
            navigate("/admin");
        }
    }, []);

    
    return (
        <Box>
            {
                isSubmitting ? <LoadingDataComponent />
                : 
                <Box my={2} borderRadius="8px" bgcolor="#fff">
                    <Box
                        sx={{
                            // width: "786px",
                            height: "89px",
                            borderRadius: "8px",
                            background: "linear-gradient(90deg, #FFFFE6 0%, #D68100 100%)",
                            position: "relative",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FFF",
                                fontSize: "30px",
                                fontWeight: "900",
                                lineHeight: "89px",
                                letterSpacing: "-0.463px",
                                textAlign: "center",
                                // verticalAlign: "middle",
                            }}
                        >{ selectedUserDetails.userType == "artist" ? selectedUserDetails.artistName : selectedUserDetails.recordLabelName }</Typography>

                        <Avatar
                            alt={selectedUserDetails.userType == "artist" ? selectedUserDetails.artistName : selectedUserDetails.recordLabelName}
                            src={selectedUserDetails.recordLabelLogo}
                            sx={{ 
                                width: {xs: 56, md: "82px"}, 
                                height: {xs: 56, md: "82px"},
                                border: "2px solid #F0F0F0",
                                position: "absolute",
                                left: "15px",
                                bottom: "-30px"
                            }}
                        />
                    </Box>


                    <Box p={2} mt="30px">
                        <Stack direction="row" alignItems="center" spacing={2}
                            justifyContent="space-between"    
                        >
                            <Box>
                                <Typography variant='body2'
                                    sx={{
                                        color: kolors.dark,
                                        fontSize: "20px",
                                        fontWeight: "900",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >{selectedUserDetails.firstName + " " + selectedUserDetails.lastName }</Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Id: </b>
                                    <span onClick={() => copyToClipboard(selectedUserDetails._id)}> 
                                        { selectedUserDetails._id }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Account Type: </b> 
                                    <span 
                                        onClick={() => copyToClipboard(selectedUserDetails.userType)}
                                        style={{ textTransform: "capitalize" }}
                                    > { selectedUserDetails.userType } </span>
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Email: </b>
                                    <span onClick={() => copyToClipboard(selectedUserDetails.email)}> 
                                        { selectedUserDetails.email }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Phone number: </b> 
                                    <span onClick={() => copyToClipboard(selectedUserDetails.phoneNumber)}>
                                        { selectedUserDetails.phoneNumber }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Country: </b> 
                                    <span onClick={() => copyToClipboard(selectedUserDetails.country)}>
                                        { selectedUserDetails.country }
                                    </span>
                                </Typography>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={2}
                                        my={2} // justifyContent="space-between" 
                                    >
                                        {
                                            selectedUserDetails.userType  == "artist" ? <></> : 
                                            <Box
                                                sx={{
                                                    p: "10px",
                                                    borderRadius: "6px",
                                                    // background: kolors.primary,
                                                    border: "1px solid #000",

                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "5px",
                                                }}
                                            >
                                                <PersonIcon sx={{ fontSize: "10px" }} />

                                                <Typography
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                    }}
                                                >{ formatedNumber(Number(rlArtistsCount)) }</Typography>

                                            </Box>
                                        }

                                        <Box
                                            sx={{
                                                p: "10px",
                                                borderRadius: "6px",
                                                // background: kolors.primary,
                                                border: "1px solid #000",

                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "5px",
                                            }}
                                        >
                                            <Box 
                                                sx={{
                                                    p: "0.5px",
                                                    display: "flex",
                                                    border: "1px solid #000",
                                                    borderRadius: "100%"
                                                }}
                                            >
                                                <MusicNoteIcon sx={{ fontSize: "10px" }} />
                                            </Box>

                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{ formatedNumber(Number(releaseCount)) }</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                p: "10px",
                                                borderRadius: "6px",
                                                background: "#C9F6D0",
                                                // border: "1px solid #000",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#0AA623",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{currencyDisplay(Number(selectedUserDetails.balance))}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                            </Box>
                        </Stack>

                        <Stack direction="row" spacing="10px" alignItems="center" justifyContent="space-between">
                            <BackNavigationArrowBtn />

                            <ArtistAnalyticsNavComponent 
                                currentPage={analyticsViewType}
                                setCurrentPage={setAnalyticsView}
                            />

                            <Box> </Box>
                        </Stack>

                        {
                            analyticsViewType == "balance-history" ? 
                                <Box>
                                    <BalanceHistory />
                                </Box>
                            : analyticsViewType == "sales-report" ? 
                                <Box>
                                    <SalesReport />
                                </Box>
                            : <Box>

                            </Box>
                        }


                    </Box>

                </Box>
            }

        </Box>
    )
}
