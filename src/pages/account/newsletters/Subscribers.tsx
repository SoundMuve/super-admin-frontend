import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import kolors from '@/constants/kolors';
import { useNewsletterHook } from '@/hooks/newsletter/useNewsletterHook';

import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import kolors from '@/constants/kolors';
import { displayCreatedAtDate } from '@/util/dateTime';
import { copyToClipboard } from '@/util/copyNshare';


export default function Subscribers() {
    const navigate = useNavigate();

    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,

        isSubmitting,

        subscribers,
        getNewsLetterSubscribers
    } = useNewsletterHook();

    useEffect(() => {
        getNewsLetterSubscribers(1, limitNo);
    }, []);
    

    return (
        <Box my={5} >

            <Stack direction="row" alignItems="center" spacing={0.5} mb={3}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIosIcon sx={{ fontSize: "16px" }} />
                </IconButton>

                <Typography
                    sx={{
                        color: "#7B7979",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "11.101px",
                        letterSpacing: "-0.463px",
                        mb: 3
                    }}
                >Newsletter Subscribers</Typography>
            </Stack>


            <Box borderRadius="8px" bgcolor="#fff" p={2} overflow="hidden">
                {
                    isSubmitting ? <LoadingDataComponent />
                    : subscribers.length ?
                        <Box>
                            <Grid container spacing="20px">
                                {
                                    subscribers.map((subscriber, index) => (
                                        <Grid item xs={6} sm={4} md={3} lg={3}  key={index} 
                                            sx={{ borderBottom: "1px solid #E4E7EC" }}
                                        >
                                            <Box>
                                                <Typography
                                                    title="Click to copy" 
                                                    onClick={() => copyToClipboard(subscriber.email)}
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ subscriber.email }</Typography>

                                                <Typography
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "10px",
                                                        fontWeight: "400",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ displayCreatedAtDate(subscriber.createdAt) }</Typography>
                                            </Box>
                                        </Grid>
                                    ))
                                }
                                
                            </Grid>

            
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                component="div"
                                count={totalRecords} // totalRecords
                                rowsPerPage={limitNo}
                                page={currentPageNo -1}
                                onPageChange={(_e, page)=> {
                                    console.log(page);
            
                                    const newPage = page + 1;
                                    getNewsLetterSubscribers(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getNewsLetterSubscribers(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No newsletter subscriber yet!" /> </Box>
                }
            </Box>
        </Box>
    )
}
