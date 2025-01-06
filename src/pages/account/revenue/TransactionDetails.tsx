import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

// import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { CreditTransactionComponent } from '@/components/account/transactions/CreditTransaction';
import kolors from '@/constants/kolors';
import { copyToClipboard } from '@/util/copyNshare';
import { currencyDisplay, getQueryParams } from '@/util/resources';
import { useTransactionHook } from '@/hooks/transactions/useTransactionHook';
import { displayCreatedAtDate } from '@/util/dateTime';
import { transactionRevenueDetailsInterface } from '@/typeInterfaces/transaction.interface';
import { WithdrawalTransactionComponent } from '@/components/account/transactions/WithdrawalTransaction';



export default function TransactionDetails() {
    const navigate = useNavigate();
    const {_id} = useParams();
    // const transactionType = getQueryParams("transactionType");
    
    const {
        // apiResponse, // setApiResponse,

        // isSubmitting,

        transactionRevenueDetails,
        getTransactionById

    } = useTransactionHook();

    useEffect(() => {
        if (_id) {
            getTransactionById(_id);
        } else {
            navigate("/admin");
        }
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

    const getTransactionTypeView = (transactionRevenueDetails: transactionRevenueDetailsInterface) => {
        const transactionType = getQueryParams("transactionType") || transactionRevenueDetails.transaction.transactionType;

        if (transactionType == "Credit") {
            return (
                <CreditTransactionComponent 
                    analytics={transactionRevenueDetails.analytics}
                    release={transactionRevenueDetails.release}
                />
            )
        } else if (transactionType == "Withdrawal") {
            return (
                <WithdrawalTransactionComponent 
                    payoutData={transactionRevenueDetails.payout}
                />
            );
        } else if (transactionType == "Debit") {
            return (
                null
            );
        }

    }


    return (
        <Box>
            {
                !transactionRevenueDetails ? <LoadingDataComponent />
                : 
                <Box my={2} borderRadius="8px" bgcolor="#fff">

                    <Box p={2} mt="30px">
                        <Stack direction="row" alignItems="center" spacing={2}
                            justifyContent="space-between"    
                        >
                            <Box>
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Transaction Id: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.transaction._id)}> 
                                        { transactionRevenueDetails.transaction._id }
                                    </span>
                                </Typography>
                                
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Transaction Type: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.transaction.transactionType)}> 
                                        { transactionRevenueDetails.transaction.transactionType }
                                    </span>
                                </Typography>
                                
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Amount: </b>
                                    <span> 
                                        { currencyDisplay(Number(transactionRevenueDetails.transaction.amount)) }
                                    </span>
                                </Typography>
                                
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Description: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.transaction.description)}> 
                                        { transactionRevenueDetails.transaction.description }
                                    </span>
                                </Typography>
                                
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Status: </b>
                                    <span> 
                                        <Chip 
                                            label={ transactionRevenueDetails.transaction.status } 
                                            size='small' 
                                            color={getStatusChipColor(transactionRevenueDetails.transaction.status)}
                                            // color="warning"
                                        />
                                    </span>
                                </Typography>
                                
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Date: </b>
                                    <span> 
                                        { displayCreatedAtDate(transactionRevenueDetails.transaction.createdAt) }
                                    </span>
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
                                    <b style={{color: kolors.dark}}>FullName: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.user.firstName + ' ' + transactionRevenueDetails.user.lastName)}> 
                                        { transactionRevenueDetails.user.firstName + ' ' + transactionRevenueDetails.user.lastName }
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
                                        onClick={() => copyToClipboard(transactionRevenueDetails.user.userType)}
                                        style={{ textTransform: "capitalize" }}
                                    > { transactionRevenueDetails.user.userType } </span>
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
                                    <b style={{color: kolors.dark}}>Artist/Record Label Name: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.user.artistName || transactionRevenueDetails.user.recordLabelName || '')}> 
                                        { transactionRevenueDetails.user.artistName || transactionRevenueDetails.user.recordLabelName || '' }
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
                                    <b style={{color: kolors.dark}}>Email: </b>
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.user.email)}> 
                                        { transactionRevenueDetails.user.email }
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
                                    <span onClick={() => copyToClipboard(transactionRevenueDetails.user.phoneNumber)}>
                                        { transactionRevenueDetails.user.phoneNumber }
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
                                    <b style={{color: kolors.dark}}>Balance: </b> 
                                    <span onClick={() => copyToClipboard( currencyDisplay(Number(transactionRevenueDetails.user.balance)) )}
                                        style={{ color: "#0AA623" }}
                                    >
                                        { currencyDisplay(Number(transactionRevenueDetails.user.balance)) }
                                    </span>
                                </Typography>

                            </Box>
                        </Stack>

                        <Box my={3}>
                            { getTransactionTypeView(transactionRevenueDetails) }

                            {/* <CreditTransactionComponent 
                                analytics={transactionRevenueDetails.analytics}
                                release={transactionRevenueDetails.release}
                            /> */}
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}
