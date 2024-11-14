import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { couponInterface } from '@/typeInterfaces/cartInterface';
import { currencyDisplay, getCouponStatusColor, handleGetTotalAmount } from '@/util/resources';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
// import kolors from '@/constants/kolors';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useCoupon } from '@/hooks/coupon/useCoupon';
import LoadingDataComponent from '@/components/LoadingData';
import EmptyListComponent from '@/components/EmptyList';
import { useCouponStore } from '@/state/couponStore';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { displayCreatedAtDate } from '@/util/dateTime';


export default function Coupons() {

    const {
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        // totalPages,

        isSubmitting,

        couponApplications, 
        getCouponApplications,
        // getCouponById,
    } = useCoupon();

    useEffect(() => {
        getCouponApplications(1, limitNo);
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
            >Coupon Discount Applications</Typography>


            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                {
                    isSubmitting ? <LoadingDataComponent />
                    : couponApplications.length ?
                        <Box>
                            <TableContainer>
                                <Table aria-label="coupon table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>User Name</TableCell>
                                            <TableCell>User Email</TableCell>
                                            {/* <TableCell>Release</TableCell> */}
                                            <TableCell>No. of Release</TableCell>
                                            <TableCell>Total Amount</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
            
                                    <TableBody>
                                        {couponApplications.map((data) => (
                                            <CouponsTableRow couponData={data} key={data._id} />
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
                                    getCouponApplications(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getCouponApplications(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No coupon discount application available" /> </Box>
                }
            </Box>
        </Box>
    )
}



const CouponsTableRow = ({couponData}: {couponData: couponInterface}) => {
    const navigate = useNavigate();
    const _setCouponDetails = useCouponStore((state) => state._setCouponDetails);
    
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        _setCouponDetails(couponData);

        const params = {
            coupon_id: couponData._id,
        };
        navigate({
            pathname: "/admin/coupons/details",
            search: `?${createSearchParams(params)}`,
        });
    }

    return (
        <>
            <TableRow
                // key={data._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell onClick={() => handleClick()}
                >{couponData.user_name}</TableCell>

                <TableCell onClick={() => handleClick()}
                >{couponData.user_email}</TableCell>

                {/* <TableCell>
                    { couponData.cartItems[0].title + " - " + couponData.cartItems[0].artistName }
                </TableCell> */}

                <TableCell onClick={() => handleClick()}
                >{couponData.cartItems.length}</TableCell>

                <TableCell onClick={() => handleClick()}
                >{ handleGetTotalAmount(couponData.cartItems) }</TableCell>

                <TableCell onClick={() => handleClick()}
                >{ displayCreatedAtDate(couponData.createdAt) }</TableCell>

                <TableCell onClick={() => handleClick()}
                    sx={{ color: getCouponStatusColor(couponData.status, "text") }}
                >{ couponData.status }</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Cart Items
                            </Typography>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Artist Name</TableCell>
                                        <TableCell>Release Type</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {couponData.cartItems.map((cartItem, index) => (
                                        <TableRow key={cartItem._id || index}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell>{cartItem.artistName}</TableCell>
                                            <TableCell>{cartItem.releaseType}</TableCell>
                                            <TableCell>{cartItem.title}</TableCell>

                                            <TableCell align="right">
                                                { currencyDisplay(Number(cartItem.price)) }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
