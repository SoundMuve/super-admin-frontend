import { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import kolors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { displayCreatedAtDate } from '@/util/dateTime';
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import { useTransactionHook } from '@/hooks/transactions/useTransactionHook';

export default function RevenueArea() {
    const navigate = useNavigate();

    const {
        // apiResponse, // setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,

        // isSubmitting,

        revenueTransactions,
        withdrawalRequests,
        totalTransactionAnalysis,

        getTransactions,
        getWithdrawalRequest,
        getTopTotalTransactionAnalysis,

    } = useTransactionHook();

    useEffect(() => {
        getTransactions(1, limitNo);
        getWithdrawalRequest();
        getTopTotalTransactionAnalysis();
    }, []);

    const getStatusChipColor = (status: "Pending" | "Processing" | "Success" | "Complete" | "Failed") => {
        // "success" | "primary" | "secondary" | "error" | "info" | "warning",

        if (status == "Success") {
            return "success"
        } else if (status == "Complete") {
            return "success"
        } else if (status == "Processing") {
            return "info"
        } else if (status == "Pending") {
            return "warning"
        } else if (status == "Failed") {
            return "error"
        } else {
            return "secondary"
        }
    }


    return (
        <Box my={5}>

            {
                totalTransactionAnalysis ? 
                    <Box my={5}>
                        <Stack mb={3} direction="row" gap={2} 
                            alignItems="center" justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            <Box p={1.5}
                                sx={{
                                    // width: "240px",
                                    maxWidth: "240px",
                                    height: "70px",
                                    borderRadius: "10px",
                                    flexGrow: 1,
                                    bgcolor: "#fff",
                                    // background: `linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)`
                                    // background: `linear-gradient(180deg, ${kolors.tertiary} 0%, ${kolors.bg} 49%, ${kolors.tertiary} 100%)`
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >Total users</Typography>

                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                    marginTop="auto" height="100%"
                                >
                                    <Typography
                                        sx={{
                                            color: "#000",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >{formatedNumber(Number(totalTransactionAnalysis.totalUsers.totalUsers))}</Typography>

                                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: kolors.dark,
                                                    fontWeight: "500",
                                                    lineHeight: "11.101px",

                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ formatedNumber(Number(totalTransactionAnalysis.totalUsers.totalArtist)) }</Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    color: "#7B7979",
                                                    lineHeight: "11.101px",
                                                }}
                                            >Artist</Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: kolors.dark,
                                                    fontWeight: "500",
                                                    lineHeight: "11.101px",

                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ formatedNumber(Number(totalTransactionAnalysis.totalUsers.totalRl)) }</Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    color: "#7B7979",
                                                    lineHeight: "11.101px",
                                                }}
                                            >Record Label</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>

                            <Box p={1.5}
                                sx={{
                                    // width: "240px",
                                    maxWidth: "240px",
                                    height: "70px",
                                    borderRadius: "10px",
                                    flexGrow: 1,
                                    bgcolor: "#fff",
                                    // background: `linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)`
                                    // background: `linear-gradient(180deg, ${kolors.tertiary} 0%, ${kolors.bg} 49%, ${kolors.tertiary} 100%)`
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >Total revenue</Typography>

                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                    marginTop="auto" height="100%"
                                >
                                    <Typography noWrap
                                        sx={{
                                            color: "#000",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            // lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >{currencyDisplay(Number(totalTransactionAnalysis.totalBalance))}</Typography>

                                </Stack>
                            </Box>

                            <Box p={1.5}
                                sx={{
                                    // width: "240px",
                                    maxWidth: "240px",
                                    height: "70px",
                                    borderRadius: "10px",
                                    flexGrow: 1,
                                    bgcolor: "#fff",
                                    // background: `linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)`
                                    // background: `linear-gradient(180deg, ${kolors.tertiary} 0%, ${kolors.bg} 49%, ${kolors.tertiary} 100%)`
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >Total user's balance</Typography>

                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                    marginTop="auto" height="100%"
                                >
                                    <Typography noWrap
                                        sx={{
                                            color: "#000",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            // lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >{currencyDisplay(Number(totalTransactionAnalysis.totalUsersBalance))}</Typography>

                                </Stack>
                            </Box>

                            <Box p={1.5}
                                sx={{
                                    // width: "240px",
                                    maxWidth: "240px",
                                    height: "70px",
                                    borderRadius: "10px",
                                    flexGrow: 1,
                                    bgcolor: "#fff",
                                    // background: `linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)`
                                    // background: `linear-gradient(180deg, ${kolors.tertiary} 0%, ${kolors.bg} 49%, ${kolors.tertiary} 100%)`
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >Total paidout</Typography>

                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                    marginTop="auto" height="100%"
                                >
                                    <Typography noWrap
                                        sx={{
                                            color: "#000",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            // lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >{currencyDisplay(Number(totalTransactionAnalysis.totalPaidoutAmount || 0))}</Typography>

                                </Stack>
                            </Box>

                        </Stack>
                    </Box>
                : <></>
            }



            <Box borderRadius="8px" bgcolor="#fff" p={2}>

                <Grid container spacing="20px">
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography variant='h3'
                            sx={{
                                color: kolors.dark,
                                fontSize: "20px",
                                fontWeight: "900",
                                // lineHeight: "8.29px",
                                letterSpacing: "-0.345px"
                            }}
                        >Transaction history</Typography>

                        <Box p={1} my={2}>
                            {
                                !revenueTransactions ? 
                                    <Stack alignItems="center" justifyContent="center"
                                        sx={{
                                            border: `1px solid ${kolors.bodyBg}`,
                                            borderRadius: "10px"
                                        }}
                                    >
                                        <LoadingDataComponent />
                                    </Stack>
                                : revenueTransactions.length ? 
                                    <Box>
                                        <TableContainer>
                                            <Table aria-label="Analytics table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell>Amount ($)</TableCell>
                                                        <TableCell>Transaction Type</TableCell>
                                                        <TableCell>Description</TableCell>

                                                        <TableCell>User</TableCell>

                                                        <TableCell>Date</TableCell>
                                                        <TableCell>Status</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {revenueTransactions.map((transaction, index) => (
                                                        <TableRow
                                                            key={transaction._id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                            onClick={() => {
                                                                // _setContactDetails(contactData);
                                                                // navigate(`/admin/contacts/${contactData._id}`);

                                                                const params = {
                                                                    transactionType: transaction.transactionType,
                                                                };
                                                                navigate({
                                                                    pathname: `/admin/revenue/${transaction._id}`,
                                                                    search: `?${createSearchParams(params)}`,
                                                                });
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
                                                                >{ currencyDisplay((Number(transaction.amount))) }</Typography>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "14px",
                                                                        fontWeight: "500",
                                                                        // lineHeight: "20px",
                                                                        textTransform: "capitalize"
                                                                    }}
                                                                >{transaction.transactionType}</Typography>

                                                                <Typography component="small"
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "12px",
                                                                        fontWeight: "400",
                                                                        display: transaction.withdrawal?.paymentMethod ? "initial" : "none"
                                                                    }}
                                                                >({transaction.withdrawal?.paymentMethod})</Typography>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "14px",
                                                                        fontWeight: "500",
                                                                        // lineHeight: "20px",
                                                                        // textTransform: "capitalize"
                                                                    }}
                                                                >{transaction.description}</Typography>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "14px",
                                                                        fontWeight: "500",
                                                                        // lineHeight: "20px",
                                                                        textTransform: "capitalize"
                                                                    }}
                                                                >{ transaction.firstName + " " + transaction.lastName }</Typography>

                                                                <Typography
                                                                    sx={{
                                                                        color: "#667085",
                                                                        fontSize: "12px",
                                                                        fontWeight: "500",
                                                                        // lineHeight: "20px",
                                                                        textTransform: "capitalize"
                                                                    }}
                                                                >({ transaction.artistName || transaction.recordLabelName })</Typography>
                                                            </TableCell>


                                                            <TableCell
                                                                sx={{
                                                                    color: "#667085",
                                                                    fontSize: "14px",
                                                                    fontWeight: "500",
                                                                    lineHeight: "20px"
                                                                }}
                                                            >{ displayCreatedAtDate(transaction.createdAt) }</TableCell>

                                                            <TableCell>
                                                                <Chip 
                                                                    label={ transaction.status } 
                                                                    size='small' 
                                                                    color={getStatusChipColor(transaction.status)}
                                                                    // color="warning"
                                                                />
                                                            </TableCell>
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
                                                getTransactions(newPage, limitNo);
                                            }}
                                            onRowsPerPageChange={(e) => {
                                                const value = e.target.value;
                                                console.log(value);
                        
                                                setLimitNo(Number(value));
                                                getTransactions(1, limitNo);
                                            }}
                                        />
                                    </Box>
                                : <Box my={3}> <EmptyListComponent notFoundText="No transaction record yet." /> </Box>
                            }

                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}>
                        <Typography variant='h2'
                            sx={{
                                color: kolors.dark,
                                fontSize: "20px",
                                fontWeight: "900",
                                // lineHeight: "8.29px",
                                letterSpacing: "-0.345px"
                            }}
                        >Withdrawal request</Typography>

                        <Box bgcolor={kolors.bodyBg} borderRadius="10px" p={1} my={2}>
                            {
                                !withdrawalRequests ? <LoadingDataComponent />
                                : withdrawalRequests.length ?
                                    withdrawalRequests.map((withdrawal) => (
                                        <Box bgcolor="#fff" borderRadius="8px" p={1.5} mb={1} key={withdrawal._id}
                                            onClick={() => {
                                                const params = {
                                                    transactionType: withdrawal.transactionType,
                                                };
                                                navigate({
                                                    pathname: `/admin/revenue/${withdrawal._id}`,
                                                    search: `?${createSearchParams(params)}`,
                                                });
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography variant='h3'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "20px",
                                                        fontWeight: "900",
                                                        // lineHeight: "8.29px",
                                                        letterSpacing: "-0.345px"
                                                    }}
                                                >{currencyDisplay(Number(withdrawal.amount))}</Typography>

                                                <IconButton size='small'>
                                                    <MoreVertIcon sx={{ fontSize: "14px", color: "#7B7979" }} />
                                                </IconButton>
                                            </Stack>

                                            <Box mt={2}>
                                                <Typography
                                                    sx={{
                                                        color: "#7B7979",
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                        // lineHeight: "8.29px",
                                                        letterSpacing: "-0.345px"
                                                    }}
                                                >{ withdrawal.firstName + " " + withdrawal.lastName }</Typography>

                                                <Typography
                                                    sx={{
                                                        color: "#7B7979",
                                                        fontSize: "13px",
                                                        fontWeight: "500",
                                                        // lineHeight: "8.29px",
                                                        letterSpacing: "-0.345px"
                                                    }}
                                                >
                                                    { withdrawal.artistName || withdrawal.recordLabelName }
                                                    <span style={{ textTransform: "capitalize" }}>({ withdrawal.userType })</span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                : <Box my={3}> <EmptyListComponent notFoundText="No pending withdrawal request yet." /> </Box>
                            }

                            {/* <Box bgcolor="#fff" borderRadius="8px" p={1.5} mb={1}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography variant='h3'
                                        sx={{
                                            color: kolors.dark,
                                            fontSize: "20px",
                                            fontWeight: "900",
                                            // lineHeight: "8.29px",
                                            letterSpacing: "-0.345px"
                                        }}
                                    >{currencyDisplay(Number(300))}</Typography>

                                    <IconButton size='small'>
                                        <MoreVertIcon sx={{ fontSize: "14px", color: "#7B7979" }} />
                                    </IconButton>
                                </Stack>

                                <Box mt={2}>
                                    <Typography
                                        sx={{
                                            color: "#7B7979",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            // lineHeight: "8.29px",
                                            letterSpacing: "-0.345px"
                                        }}
                                    >Joseph solomon</Typography>

                                    <Typography
                                        sx={{
                                            color: "#7B7979",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            // lineHeight: "8.29px",
                                            letterSpacing: "-0.345px"
                                        }}
                                    >Joseph solomon(artist)</Typography>
                                </Box>
                            </Box> */}

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
