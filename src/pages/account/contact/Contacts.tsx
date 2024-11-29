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
import { useContactHook } from '@/hooks/contacts/useContactHook';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { getCouponStatusColor } from '@/util/resources';
import { displayCreatedAtDate } from '@/util/dateTime';
import { useGeneralStore } from '@/state/generalStore';
import kolors from '@/constants/kolors';
import { numberOfLinesTypographyStyle } from '@/util/mui';


export default function Contacts() {
    const navigate = useNavigate();
    const _setContactDetails = useGeneralStore((state) => state._setContactDetails);


    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        // totalPages,

        isSubmitting,

        contactMessages, 
        getContactMessages,
        // getContactMessagesById,
    } = useContactHook();

    useEffect(() => {
        getContactMessages(1, limitNo);
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
                    : contactMessages.length ?
                        <Box>
                            <TableContainer>
                                <Table aria-label="coupon table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Sender</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { contactMessages.map((contactData, index) => (
                                            <TableRow
                                                key={contactData._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                onClick={() => {
                                                    _setContactDetails(contactData);
                                                    navigate(`/admin/contacts/${contactData._id}`);


                                                    // const params = {
                                                    //     contact_id: contactData._id,
                                                    // };
                                                    // navigate({
                                                    //     // pathname: "/admin/contacts/details",
                                                    //     pathname: `/admin/contacts/${contactData._id}`,
                                                    //     search: `?${createSearchParams(params)}`,
                                                    // });
                                                }}
                                            >
                                                <TableCell component="th" scope="row"
                                                >{ (limitNo * (currentPageNo - 1)) + (index + 1) }</TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: kolors.dark,
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            lineHeight: "20px"
                                                        }}
                                                    >{ contactData.name }</Typography>

                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            lineHeight: "20px"
                                                        }}
                                                    >{ contactData.email }</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                            ...numberOfLinesTypographyStyle(2)
                                                        }}
                                                    >{contactData.message}</Typography>
                                                </TableCell>


                                                <TableCell
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ displayCreatedAtDate(contactData.createdAt) }</TableCell>

                                                <TableCell
                                                    sx={{ color: getCouponStatusColor("Pending", "text") }}
                                                >{ contactData.status }</TableCell>
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
                                    getContactMessages(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getContactMessages(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No coupon discount application available" /> </Box>
                }
            </Box>
        </Box>
    )
}
