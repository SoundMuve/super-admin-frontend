import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import kolors from '@/constants/kolors';
import { currencyDisplay } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import sampleArtWork from "@/assets/images/sampleArtWork.png";
import { transactionInterface } from '@/typeInterfaces/transaction.interface';


interface _Props {
    transaction: transactionInterface,
}

export const PaymentTransactionComponent: React.FC<_Props> = ({
    transaction
}) => {


    return (
        <Box>
            <Typography variant='h2' noWrap
                sx={{
                    color: kolors.dark,
                    fontSize: {xs: "20px", md: "30px"},
                    fontWeight: "500",
                    // lineHeight: "40px",
                    letterSpacing: "-0.444px",
                    // cursor: "context-menu"
                }}
            >Release Paid for: </Typography>


            <Grid container spacing="15px">
                {
                    transaction.payment?.cartItems.map((transactionCartItem, index) => (
                        <Grid item key={index} xs={12}
                            md={ transaction.payment?.cartItems && transaction.payment?.cartItems.length > 1 ? 6 : 12 }
                        >
                            <Box>
                                <Stack direction="row" gap={2} >
                                    <Box>
                                        <img src={ transactionCartItem.coverArt || sampleArtWork}
                                            alt={`cover art work for ${ transactionCartItem.title }`}
                                            style={{
                                                width: "100%",
                                                minWidth: "100px",
                                                maxWidth: "150px",
                                                borderRadius: '12px',
                                                // height: "100%",
                                                backgroundColor: kolors.bg,
                                                objectFit: "contain"
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Box mb={1}>
                                            <Typography sx={{ color: "#7B7979" }}
                                                title="Click to copy" onClick={() => copyToClipboard(transactionCartItem.title)}
                                            >
                                                <b style={{color: kolors.dark }}>Song Title: </b>
                                                { transactionCartItem.title }
                                            </Typography>
                                        </Box>

                                        <Box mb={1}>
                                            <Typography sx={{ color: "#7B7979" }}
                                                title="Click to copy" onClick={() => copyToClipboard(transactionCartItem.artistName)}
                                            >
                                                <b style={{color: kolors.dark }}>Main Artist: </b>
                                                { transactionCartItem.artistName }
                                            </Typography>
                                        </Box>

                                        <Box mb={1}>
                                            <Typography sx={{ color: "#7B7979" }}
                                                title="Click to copy" onClick={() => copyToClipboard(transactionCartItem.releaseType)}
                                            >
                                                <b style={{color: kolors.dark }}>Release Type: </b>
                                                { transactionCartItem.releaseType }
                                            </Typography>
                                        </Box>

                                        <Box mb={1}>
                                            <Typography sx={{ color: "#7B7979" }}
                                                title="Click to copy" onClick={() => copyToClipboard(transactionCartItem._id)}
                                            >
                                                <b style={{color: kolors.dark }}>Release Id: </b>
                                                { transactionCartItem._id }
                                            </Typography>
                                        </Box>

                                        <Box mb={1}>
                                            <Typography sx={{ color: "#7B7979" }}>
                                                <b style={{color: kolors.dark }}>Price: </b>
                                                { currencyDisplay(Number(transactionCartItem.price)) }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>


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
                >Payment Details</Typography>

                <Box>
                    <AnalyticsDataComponent title='Currency' value={transaction.payment?.currency || 'USD'} />

                    <AnalyticsDataComponent title='Paid Amount' 
                        value={ currencyDisplay(Number(transaction.payment?.paidAmount || 0)) } 
                    />

                    <AnalyticsDataComponent title='Total Amount' 
                        value={ currencyDisplay(Number(transaction.payment?.totalAmount || 0)) } 
                    />

                    <AnalyticsDataComponent title='Payment Intent' 
                        value={ transaction.payment?.paymentIntent || "" } 
                    />

                    <AnalyticsDataComponent title='Payment Intent Client Secret' 
                        value={ transaction.payment?.paymentIntentClientSecret || "" } 
                    />

                    <AnalyticsDataComponent title='Payment Status' 
                        value={ transaction.payment?.paymentStatus || "" } 
                    />
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
