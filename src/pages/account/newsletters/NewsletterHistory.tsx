import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
// import kolors from '@/constants/kolors';
import { useNewsletterHook } from '@/hooks/newsletter/useNewsletterHook';
import { useGeneralStore } from '@/state/generalStore';

import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { displayCreatedAtDate } from '@/util/dateTime';
import { numberOfLinesTypographyStyle } from '@/util/mui';


export default function NewsletterHistory() {
    const navigate = useNavigate();
    const _setNewsLetterDetails = useGeneralStore((state) => state._setNewsLetterDetails);


    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        // totalPages,

        isSubmitting,

        newsletters,
        getSentNewsLetters,

    } = useNewsletterHook();

    useEffect(() => {
        getSentNewsLetters(1, limitNo);
    }, []);
    

    return (
        <Box my={5} >

            <Typography
                sx={{
                    color: "#7B7979",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "11.101px",
                    letterSpacing: "-0.463px",
                    mb: 3
                }}
            >Contact Messages</Typography>


            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                {
                    isSubmitting ? <LoadingDataComponent />
                    : newsletters.length ?
                        <Box>
                            <TableContainer>
                                <Table aria-label="newsletter table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Title</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell>No. of recipients</TableCell>
                                            <TableCell>No. of failed recipients</TableCell>
                                            <TableCell>Sent by</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { newsletters.map((newsletterData, index) => (
                                            <TableRow
                                                key={newsletterData._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                onClick={() => {
                                                    _setNewsLetterDetails(newsletterData);
                                                    navigate(`/admin/newsletter/${newsletterData._id}`);
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
                                                    >{ newsletterData.title }</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                            maxWidth: {xs: "150px", sm: "250px", md: "350px" },
                                                            overflow: "hidden",
                                                            ...numberOfLinesTypographyStyle(2)
                                                        }}
                                                        dangerouslySetInnerHTML={{ __html: newsletterData.message }}
                                                    />
                                                    {/* {newsletterData.message}</Typography> */}
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{newsletterData.recipients.length}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{newsletterData.failedRecipients.length}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{newsletterData.sentBy.name}</Typography>
                                                </TableCell>

                                                <TableCell
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ displayCreatedAtDate(newsletterData.createdAt) }</TableCell>

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
                                    console.log(page);
            
                                    const newPage = page + 1;
                                    getSentNewsLetters(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getSentNewsLetters(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No coupon discount application available" /> </Box>
                }
            </Box>
        </Box>
    )
}
