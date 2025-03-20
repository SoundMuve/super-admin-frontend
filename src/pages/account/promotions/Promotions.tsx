import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

// import promotionImg from "@/assets/images/promotion.png";
import { UploadPromotionalBannerModal } from '@/components/account/promotions/UploadPromotionalBannerModal';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { usePromotionsHook } from '@/hooks/promotions/usePromotionsHook';
import { ViewPromotionsDataModal } from '@/components/account/promotions/ViewPromotionsDataModal';


export default function Promotions() {
    const navigate = useNavigate();
    const [uploadBannerModal, setUploadBannerModal] = useState(false);
    const [viewPromotionModal, setViewPromotionModal] = useState(false);

    const {
        // apiResponse, setApiResponse,
        isSubmitting,
        activePromotions, getAllActivePromotions,
        selectedPromotion, setSelectedPromotion
    } = usePromotionsHook();

    useEffect(() => {
        getAllActivePromotions();
    }, []);
    

    return (
        <Box my={5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} mb={3}>
                <Typography
                    sx={{
                        color: "#7B7979",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "11.101px",
                        letterSpacing: "-0.463px",
                        mb: 3
                    }}
                >Active Promotions</Typography>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box onClick={() => setUploadBannerModal(true) }
                        sx={{
                            borderRadius: "8px",
                            bgcolor: kolors.milk,
                            color: kolors.primary,
                            ":hover": {
                                bgcolor: kolors.primary,
                                color: kolors.milk,
                            },
                            padding: "10px 20px",
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <CloudUploadOutlinedIcon sx={{ fontSize: "16px" }} />

                        <Typography
                            sx={{
                                // color: kolors.milk,
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >Upload banner</Typography>
                    </Box>

                    <Box onClick={() => {
                        navigate("/admin/promotions/history")
                    }}
                        sx={{
                            borderRadius: "8px",
                            bgcolor: "#fff",
                            padding: "10px 23px",
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                color: kolors.dark,
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >History</Typography>
                    </Box>
                </Stack>
            </Stack>

            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                {
                    isSubmitting ? <LoadingDataComponent />
                    : activePromotions.length ?
                        <Grid container spacing="20px">
                            {
                                activePromotions.map((banner) => (
                                    <Grid item xs={12} sm={6} md={4} key={banner._id}>
                                        <Box 
                                            onClick={() => {
                                                setSelectedPromotion(banner);
                                                setViewPromotionModal(true);
                                            }}
                                        >
                                            <Box sx={{ position: "relative" }}>
                                                <img 
                                                    src={banner.image}
                                                    alt={`${banner.title} Promotional image`}
                                                    style={{
                                                        width: "100%",
                                                        // height: "100%",
                                                        borderRadius: "8px",
                                                        objectFit: "contain",
                                                        backgroundColor: "grey"
                                                    }}
                                                />

                                                {/* <IconButton size='small'
                                                    sx={{ 
                                                        position: "absolute", top: "5px", right: "5px",
                                                        bgcolor: kolors.tertiary,
                                                        ":hover": {
                                                            bgcolor: kolors.dark,
                                                        }
                                                    }}
                                                >
                                                    <DeleteForeverOutlinedIcon sx={{ color: "#fff" }} />
                                                </IconButton> */}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    : <Box my={3}> <EmptyListComponent notFoundText="No active promotions yet!" /> </Box>
                }
            </Box>


            <UploadPromotionalBannerModal 
                closeUploadBannerModal={() => setUploadBannerModal(false)}
                openUploadBannerModal={uploadBannerModal}
            />

            {
                selectedPromotion && 
                <ViewPromotionsDataModal 
                    closePromotionsModal={() => setViewPromotionModal(false)}
                    openPromotionsModal={viewPromotionModal}
                    promotion={selectedPromotion}
                    successFunc={() => getAllActivePromotions()}
                />
            }

        </Box>
    )
}


