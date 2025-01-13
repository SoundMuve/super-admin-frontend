import { useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// import { currencyDisplay, formatedNumber } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import kolors from '@/constants/kolors';
import { payoutDetailsInterface } from '@/typeInterfaces/payout.interface';
import { transactionInterface } from '@/typeInterfaces/transaction.interface';
import { currencyDisplay } from '@/util/resources';
import { useTransactionHook } from '@/hooks/transactions/useTransactionHook';


interface _Props {
    // release: releaseInterface,
    transactionData: transactionInterface,
    payoutData: payoutDetailsInterface,
    handleManualPayment: (actionType: "reject" | "manually paid") => void,
    handleAcceptWithdrawal: () => void
}

export const WithdrawalTransactionComponent: React.FC<_Props> = ({
    payoutData, transactionData, handleManualPayment,
    handleAcceptWithdrawal,
}) => {
    const [manualWithdrawalDialog, setManualWithdrawalDialog] = useState(false);

    const {
        verifyPaypalWithdrawal,
    } = useTransactionHook();

    return (
        <Box>
            <Box
                sx={{
                    borderRadius: "8.65px",
                    border: "1px solid #C8C8C8",
                    p: 2,
                    bgcolor: kolors.bodyBg,
                    mt: 3
                }}      
            >
                <Typography
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "18px", md: "24px"},
                        mb: 3
                    }}
                >Withdrawal Request Details</Typography>

                <Box>
                    <AnalyticsDataComponent title='Id' value={payoutData._id} />
                    
                    <AnalyticsDataComponent title='Payment Method' value={payoutData.paymentMethod} />
                    
                    <AnalyticsDataComponent 
                        title="Currency" 
                        value={ payoutData?.currency.currency_code + " (" + payoutData?.currency.currency_symbol + ")" } 
                    />
                    
                    <AnalyticsDataComponent 
                        title="Amount" 
                        value={ currencyDisplay(Number(transactionData.amount)) } 
                    />

                    {
                        payoutData.account_number ?
                            <AnalyticsDataComponent title="Account Number" value={ payoutData.account_number } />
                        : <></>
                    }

                    {
                        payoutData.bank_name ? 
                            <AnalyticsDataComponent title="Bank Name" value={ payoutData.bank_name } />
                        : <></>
                    }

                    {
                        payoutData.beneficiary_name ? 
                            <AnalyticsDataComponent title="Beneficiary Name" value={ payoutData.beneficiary_name } />
                        : <></>
                    }

                    {
                        payoutData.routing_number ?
                            <AnalyticsDataComponent title="Routing Number" value={payoutData.routing_number} />
                        : <></>
                    }

                    {
                        payoutData.swift_code ?
                            <AnalyticsDataComponent title="Swift Code" value={payoutData.swift_code} />
                        : <></>
                    }

                    {
                        payoutData.beneficiary_address ? 
                            <AnalyticsDataComponent title="Beneficiary Address" value={payoutData.beneficiary_address} />
                        : <></>
                    }

                    {
                        payoutData.beneficiary_country ?
                            <AnalyticsDataComponent title="Beneficiary Country" value={payoutData.beneficiary_country} />
                        : <></>
                    }

                    {
                        payoutData.postal_code ? 
                            <AnalyticsDataComponent title="Postal Code" value={payoutData.postal_code} />
                        : <></>
                    }

                    {
                        payoutData.street_number ? 
                            <AnalyticsDataComponent title="Street Number" value={payoutData.street_number} />
                        : <></>
                    }

                    {
                        payoutData.street_name ? 
                            <AnalyticsDataComponent title="Street Name" value={payoutData.street_name} />
                        : <></>
                    }

                    {
                        payoutData.city ? 
                            <AnalyticsDataComponent title="City" value={payoutData.city} />
                        : <></>
                    }

                    {
                        payoutData.destination_branch_code ? 
                            <AnalyticsDataComponent title="Destination Branch Code" value={payoutData.destination_branch_code} />
                        : <></>
                    }


                    {
                        transactionData.metaData ? 
                            <Box mt={2} p={1} borderRadius={1.5} bgcolor="#fff">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        
                                    }}
                                >Payment Processor Responds</Typography>

                                <SyntaxHighlighter language="json" style={dark}>
                                    { JSON.stringify(transactionData.metaData, null, 3) }
                                </SyntaxHighlighter>

                                {/* <pre>{JSON.stringify(transactionData.metaData.data, null, 2)}</pre> */}
                            </Box>
                        : <></>
                    }

                </Box>


                {
                    transactionData.status == "Pending" || transactionData.status == "Processing" ? 
                        <Stack direction="row" spacing="15px" 
                            alignItems="center" justifyContent="center"
                            mt={2}
                        >
                            <Box onClick={() => handleAcceptWithdrawal()}
                                sx={{
                                    borderRadius: "8px",
                                    bgcolor: "#33500B",
                                    p: "10px",
                                    cursor: "pointer",
                                    display: transactionData.status == "Processing" ? "none" : "initial"
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#C8F452",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                    }}
                                >Accept </Typography>
                            </Box>

                            {
                                transactionData.status == "Processing" && payoutData.paymentMethod == "PayPal" ?
                                    transactionData.metaData?.data.batch_header.payout_batch_id ? 
                                        <Box onClick={() => {
                                            verifyPaypalWithdrawal(
                                                transactionData._id, 
                                                transactionData.metaData?.data.batch_header.payout_batch_id
                                            );
                                        }}
                                            sx={{
                                                borderRadius: "8px",
                                                bgcolor: "#33500B",
                                                p: "10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#C8F452",
                                                    fontSize: "13px",
                                                    fontWeight: "700",
                                                }}
                                            >Verify Payout</Typography>
                                        </Box>
                                    : <></>
                                : <></>
                            }


                            <Box onClick={() => handleManualPayment("reject")}
                                sx={{
                                    borderRadius: "8px",
                                    bgcolor: "#681B1B",
                                    p: "10px",
                                    cursor: "pointer",
                                    // display: transactionData.status == "Processing" ? "none" : "initial"
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#F9D9D9",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                    }}
                                >Reject </Typography>
                            </Box>

                            <Box onClick={() => setManualWithdrawalDialog(true)}
                                sx={{
                                    borderRadius: "8px",
                                    bgcolor: "#0AA623",
                                    p: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                    }}
                                >Paid Manually </Typography>
                            </Box>

                        </Stack>
                    : <></>
                }
            </Box>

            <Dialog
                // fullScreen={fullScreen}
                open={manualWithdrawalDialog}
                onClose={() => setManualWithdrawalDialog(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Confirm
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                        Are you sure you paid the exact amount to the user?
                    </DialogContentText>
                </DialogContent>

                <DialogActions> 
                    <Button autoFocus onClick={() => setManualWithdrawalDialog(false)}
                    >No</Button>

                    <Button autoFocus onClick={() => {
                        setManualWithdrawalDialog(false);
                        handleManualPayment("manually paid");
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}



interface s_Props {
    title: string,
    value: string,
}

const AnalyticsDataComponent: React.FC<s_Props> = ({ title, value }) => {
    return (
        <Grid container spacing={"5px"} mb={3}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='center'>
                <Box px={{ md: "10px" }}>
                    <Typography variant='body1'
                        sx={{
                            color: kolors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={9} alignSelf="center" >
                <Box 
                    sx={{
                        bgcolor: "#fff",
                        color: kolors.dark,
                        // textAlign: "center",
                        // mt: "12px",
                        borderRadius: "5px",
                        padding: "10px",
                        // height: "100%"
                    }}
                >
                    <Typography 
                        title="Click to copy" onClick={() => copyToClipboard(value)}
                        sx={{
                            color: kolors.dark,
                            fontSize: "13px",
                            fontWeight: "400",
                            lineHeight: "10.645px"
                        }}
                    >{ value }</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
