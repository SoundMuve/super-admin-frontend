import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import { usePromotionsHook } from '@/hooks/promotions/usePromotionsHook';

import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { UploadPromotionalBannerModal } from '@/components/account/promotions/UploadPromotionalBannerModal';
import { ViewPromotionsDataModal } from '@/components/account/promotions/ViewPromotionsDataModal';
import { displayCreatedAtDate } from '@/util/dateTime';
import kolors from '@/constants/kolors';


export default function PromotionHistory() {
    const [uploadBannerModal, setUploadBannerModal] = useState(false);
    const [viewPromotionModal, setViewPromotionModal] = useState(false);

    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        // totalPages,

        isSubmitting,

        allPromotions, getAllPromotions,
        selectedPromotion, setSelectedPromotion,
    } = usePromotionsHook();

    useEffect(() => {
        getAllPromotions(1, limitNo);
    }, []);
    

    return (
        <Box my={5} >
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
                >All Promotions</Typography>

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
                </Stack>
            </Stack>


            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                {
                    isSubmitting ? <LoadingDataComponent />
                    : allPromotions.length ?
                        <Box>
                            <TableContainer>
                                <Table aria-label="promotional table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Title</TableCell>
                                            <TableCell>Image Banner</TableCell>
                                            <TableCell>Display Dashboard</TableCell>
                                            <TableCell>Created by</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { allPromotions.map((promotionData, index) => (
                                            <TableRow
                                                key={promotionData._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                onClick={() => {
                                                    setSelectedPromotion(promotionData);
                                                    setViewPromotionModal(true);
                                                }}
                                            >
                                                <TableCell component="th" scope="row"
                                                >{ (limitNo * (currentPageNo - 1)) + (index + 1) }.</TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            lineHeight: "20px"
                                                        }}
                                                    >{ promotionData.title }</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Box sx={{ height: "70px" }}>
                                                        <img 
                                                            src={promotionData.image}
                                                            alt={`${promotionData.title} Promotional image`}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: "8px",
                                                                objectFit: "contain",
                                                                // backgroundColor: "grey"
                                                            }}
                                                        />
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{promotionData.userType} dashboard</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{promotionData.createdBy.name}</Typography>
                                                </TableCell>

                                                <TableCell
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ displayCreatedAtDate(promotionData.createdAt) }</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
            
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                component="div"
                                count={totalRecords} // totalRecords
                                rowsPerPage={limitNo}
                                page={currentPageNo -1}
                                onPageChange={(_e, page)=> {
                                    // console.log(page);
            
                                    const newPage = page + 1;
                                    getAllPromotions(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getAllPromotions(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No coupon discount application available" /> </Box>
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
                    successFunc={() => {
                        getAllPromotions(1, limitNo);
                    }}
                />
            }
        </Box>
    )
}
