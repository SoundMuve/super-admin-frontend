// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { currencyDisplay, formatedNumber } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import kolors from '@/constants/kolors';
import { payoutDetailsInterface } from '@/typeInterfaces/payout.interface';


interface _Props {
    // release: releaseInterface,
    // analytics: analyticsInterface,
    payoutData: payoutDetailsInterface
}

export const WithdrawalTransactionComponent: React.FC<_Props> = ({
    payoutData, // release, analytics
}) => {



    return (
        <Box>
            {/* <Typography variant='h2' noWrap
                title="Click to copy" onClick={() => copyToClipboard(release.title)}
                sx={{
                    color: kolors.dark,
                    fontSize: {xs: "20px", md: "40px"},
                    fontWeight: "500",
                    // lineHeight: "40px",
                    letterSpacing: "-0.444px",
                    // cursor: "context-menu"
                }}
            >{ release.title }</Typography> */}


            <Box
                sx={{
                    borderRadius: "8.65px",
                    border: "1px solid #C8C8C8",
                    p: 2,
                    bgcolor: kolors.bodyBg,
                    mt: 3
                }}      
            >
                <Box>
                    <AnalyticsDataComponent title='Id' value={payoutData._id} />
                    
                    <AnalyticsDataComponent title='Payment Method' value={payoutData.paymentMethod} />
                    
                    <AnalyticsDataComponent 
                        title="Currency" 
                        value={ payoutData?.currency.currency_code + " (" + payoutData?.currency.currency_symbol + ")" } 
                    />

                    <AnalyticsDataComponent title="Account Number" value={ payoutData.account_number || '' } />

                    <AnalyticsDataComponent title="Bank Name" value={ payoutData?.bank_name || "" } />

                    <AnalyticsDataComponent title="Beneficiary Name" value={ payoutData?.beneficiary_name || "" } />

                    <AnalyticsDataComponent title="Routing Number" value={payoutData?.routing_number || ''} />

                    <AnalyticsDataComponent title="Swift Code" value={payoutData?.swift_code || ''} />

                    <AnalyticsDataComponent title="Beneficiary Address" value={payoutData?.beneficiary_address || ''} />

                    <AnalyticsDataComponent title="Beneficiary Country" value={payoutData?.beneficiary_country || ''} />

                    <AnalyticsDataComponent title="Postal Code" value={payoutData.postal_code || ''} />

                    <AnalyticsDataComponent title="Street Number" value={payoutData?.street_number || ''} />

                    <AnalyticsDataComponent title="Street Name" value={payoutData?.street_name || ''} />

                    <AnalyticsDataComponent title="City" value={payoutData?.city || ''} />

                    <AnalyticsDataComponent title="Destination Branch Code" value={payoutData?.destination_branch_code || ''} />

                </Box>
            </Box>

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
