import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '@/util/copyNshare';
import { numberOfLinesTypographyStyle, releaseTextFieldStyle } from '@/util/mui';

import temptCoverPhotoImg from '@/assets/images/sampleArtWork.png';
import { currencyDisplay, getQueryParams, getTotalCartAmount, getTotalCartPriceAmount, handleGetTotalAmount } from '@/util/resources';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useCoupon } from '@/hooks/coupon/useCoupon';
import { useCouponStore } from '@/state/couponStore';
import { useNavigate } from 'react-router-dom';
import LoadingDataComponent from '@/components/LoadingData';
import Alert from '@mui/material/Alert';


export default function CouponDetails() {
    const navigate = useNavigate();
    const couponDiscountDetails = useCouponStore((state) => state.couponDetails);
    const _restoreCouponDetails = useCouponStore((state) => state._restoreCouponDetails);

    const [discountPercentage, setDiscountPercentage] = useState(`${couponDiscountDetails.discount || ''}`);
    const [discountedAmount, setDiscountedAmount] = useState<number>(couponDiscountDetails.discountedAmount || 0);
    const [payableAmount, setPayableAmount] = useState<number>(couponDiscountDetails.payableAmount || 0);
    
    const {
        apiResponse,
        isSubmitting,
        // couponApplications, 
        // getCouponApplications,
        getCouponById,
        approveDiscount,
        rejectDiscount
    } = useCoupon();


    useEffect(() => {
        const totalAmount = getTotalCartAmount(couponDiscountDetails.cartItems);
        const totalPriceAmount = getTotalCartPriceAmount(couponDiscountDetails.cartItems);

        const discounted_Amount = (totalPriceAmount * Number(discountPercentage || 0) ) / 100;
        const balanceAmount = totalAmount - discounted_Amount;

        setDiscountedAmount(discounted_Amount);
        setPayableAmount(balanceAmount);
    }, [discountPercentage]);

    useEffect(() => {
        const totalAmount = getTotalCartAmount(couponDiscountDetails.cartItems);
        const amount2payable = totalAmount - discountedAmount;
        setPayableAmount(amount2payable);

        setDiscountPercentage(`${couponDiscountDetails.discount || ''}`);
    }, [couponDiscountDetails]);


    useEffect(() => {
        if (!couponDiscountDetails._id) {
            const coupon_id = getQueryParams('coupon_id');
            if (coupon_id) {
                // get the release from the server
                getCouponById(coupon_id);
            } else{
                navigate("/admin");
            }
        } else {
            _restoreCouponDetails();
        }
    }, [isSubmitting]);



    const handleApprove = () => {
        if (!discountPercentage || Number(discountPercentage) == couponDiscountDetails.discount) {
            // display notification error that the discount Percentage
            // is required
            return;
        }

        approveDiscount(couponDiscountDetails._id, discountPercentage);
    }


    return (
        <Box my={5} >
            {
                isSubmitting ? <LoadingDataComponent />
                : 
                <Box>
                    <Typography
                        sx={{
                            color: "#7B7979",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "11.101px",
                            letterSpacing: "-0.463px",
                            mb: 3
                        }}
                    >Coupon Details</Typography>

                    <Box borderRadius="8px" bgcolor="#fff" p={2}>
                        <Box mb={4}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Stack direction="column" alignItems="center" spacing="10px"
                                    p={1.5} bgcolor={kolors.bg} width="fit-content"
                                >
                                    <Typography
                                        sx={{
                                            color: kolors.primary,
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >Number of release</Typography>

                                    <Typography
                                        sx={{
                                            color: kolors.primary,
                                            fontSize: "20",
                                            fontWeight: "600",
                                            // lineHeight: "50.747px",
                                            // letterSpacing: "-2.114px"
                                        }}
                                    >{ couponDiscountDetails.cartItems.length }</Typography>
                                </Stack>


                                {
                                    couponDiscountDetails.code && 
                                        <Stack direction="row" spacing="10px" // width="fit-content"
                                            alignItems="center" justifyContent="space-between"
                                            p=" 5px 10px" bgcolor="#EEE" borderRadius="6px"
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ couponDiscountDetails.code }</Typography>

                                            <IconButton
                                                aria-label="copy"
                                                size="small"
                                                onClick={() => copyToClipboard(couponDiscountDetails.code || '')}
                                            >
                                                <ContentCopyIcon sx={{color: kolors.primary, fontSize: "16px"}} />
                                            </IconButton>
                                        </Stack>
                                }

                            </Stack>
                        </Box>

                        <Grid container spacing="20px">
                            <Grid item xs={12} md={5} lg={4}>
                                <Box>
                                    <Box mb={2}>
                                        <Typography
                                            sx={{
                                                color: kolors.dark,
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "11.101px",
                                                letterSpacing: "-0.463px",
                                                mb: 1
                                            }}
                                        >Instagram/Facebook link</Typography>

                                        <Stack direction="row" spacing="10px" 
                                            alignItems="center" justifyContent="space-between"
                                            p=" 5px 10px" bgcolor="#EEE" borderRadius="6px"
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ couponDiscountDetails.instagramFacebookLink }</Typography>

                                            <IconButton
                                                aria-label="copy"
                                                size="small"
                                                onClick={() => copyToClipboard(couponDiscountDetails.instagramFacebookLink)}
                                            >
                                                <ContentCopyIcon sx={{color: kolors.primary, fontSize: "16px"}} />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Box mb={2}>
                                        <Typography
                                            sx={{
                                                color: kolors.dark,
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "11.101px",
                                                letterSpacing: "-0.463px",
                                                mb: 1
                                            }}
                                        >Youtube link</Typography>

                                        <Stack direction="row" spacing="10px" 
                                            alignItems="center" justifyContent="space-between"
                                            p=" 5px 10px" bgcolor="#EEE" borderRadius="6px"
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ couponDiscountDetails.youtubeLink }</Typography>

                                            <IconButton
                                                aria-label="copy"
                                                size="small"
                                                onClick={() => copyToClipboard(couponDiscountDetails.youtubeLink)}
                                            >
                                                <ContentCopyIcon sx={{color: kolors.primary, fontSize: "16px"}} />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Box mb={2}>
                                        <Typography
                                            sx={{
                                                color: kolors.dark,
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "11.101px",
                                                letterSpacing: "-0.463px",
                                                mb: 1
                                            }}
                                        >X <small>(formally twitter)</small> link</Typography>

                                        <Stack direction="row" spacing="10px" 
                                            alignItems="center" justifyContent="space-between"
                                            p=" 5px 10px" bgcolor="#EEE" borderRadius="6px"
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ couponDiscountDetails.xLink }</Typography>

                                            <IconButton
                                                aria-label="copy"
                                                size="small"
                                                onClick={() => copyToClipboard(couponDiscountDetails.xLink)}
                                            >
                                                <ContentCopyIcon sx={{color: kolors.primary, fontSize: "16px"}} />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Box mb={2}>
                                        <Typography
                                            sx={{
                                                color: kolors.dark,
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: "11.101px",
                                                letterSpacing: "-0.463px",
                                                mb: 1
                                            }}
                                        >User Email Address</Typography>

                                        <Stack direction="row" spacing="10px" 
                                            alignItems="center" justifyContent="space-between"
                                            p=" 5px 10px" bgcolor="#EEE" borderRadius="6px"
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ couponDiscountDetails.user_email }</Typography>

                                            <IconButton
                                                aria-label="copy"
                                                size="small"
                                                onClick={() => copyToClipboard(couponDiscountDetails.user_email)}
                                            >
                                                <ContentCopyIcon sx={{color: kolors.primary, fontSize: "16px"}} />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={7} lg={8}>
                                <Box bgcolor={kolors.bg} p={1.5}>
                                    {
                                        couponDiscountDetails.cartItems.map((item) => (
                                            <Stack direction="row" spacing="10px" mb={1.5} key={item._id}>
                                                <Box
                                                    sx={{
                                                        width: "100px",
                                                        height: "100px",
                                                        borderRadius: "12px",
                                                        bgcolor: kolors.secondary,
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    <img src={item.coverArt || temptCoverPhotoImg} alt='song art work image'
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                </Box>

                                                <Box>
                                                    <Typography variant='h4'
                                                        onClick={() => copyToClipboard(item.title)}
                                                        sx={{
                                                            fontWeight: "600",
                                                            fontSize: "15px",
                                                            // lineHeight: "40px",
                                                            letterSpacing: "-0.13px",
                                                            color: kolors.dark,
                                                            cursor: "pointer",
                                                            ...numberOfLinesTypographyStyle(1)
                                                        }}
                                                    >{ item.title }</Typography>

                                                    <Typography variant='h4'
                                                        sx={{
                                                            fontWeight: "400",
                                                            fontSize: "13px",
                                                            // lineHeight: "40px",
                                                            letterSpacing: "-0.13px",
                                                            color: kolors.dark,
                                                            mb: 1,
                                                            ...numberOfLinesTypographyStyle(1)
                                                        }}
                                                    >{ item.artistName }</Typography>

                                                    <Typography variant='subtitle2'
                                                        sx={{
                                                            fontWeight: "500",
                                                            fontSize: "13px",
                                                            // lineHeight: "40px",
                                                            letterSpacing: "-0.13px",
                                                            // color: kolors.secondary
                                                        }}
                                                    >{ currencyDisplay(Number(item.price)) }</Typography>

                                                    <Typography variant='subtitle2'
                                                        sx={{
                                                            fontWeight: "300",
                                                            fontSize: "12px",
                                                            // lineHeight: "40px",
                                                            letterSpacing: "-0.13px",
                                                            // color: kolors.secondary
                                                        }}
                                                    >{ item.releaseType }</Typography>

                                                </Box>
                                            </Stack>
                                        ))
                                    }

                                    <Typography>
                                        Total Amount: <b>
                                            { handleGetTotalAmount(couponDiscountDetails.cartItems) }
                                        </b>
                                    </Typography>

                                    <Typography>
                                        Total Price: <b>
                                            { handleGetTotalAmount(couponDiscountDetails.cartItems, "price") }
                                        </b>
                                    </Typography>

                                    <Typography>
                                        Total pre-order amount: <b>
                                            { handleGetTotalAmount(couponDiscountDetails.cartItems, "pre-order") }
                                        </b>
                                    </Typography>

                                    <Box>
                                        <Typography>
                                            Discounted
                                        </Typography>

                                        <Stack direction="row" alignItems="center" 
                                            justifyContent="space-between"
                                        >
                                            <Typography fontSize="14px">
                                                Amount: <b>
                                                    { currencyDisplay(Number(discountedAmount)) }
                                                </b>
                                            </Typography>

                                            <Typography fontSize="14px">
                                                Percentage: <b>
                                                    { discountPercentage }%
                                                </b>
                                            </Typography>

                                        </Stack>
                                    </Box>

                                    <Divider />

                                    <Typography>
                                        Payable Amount: <b>
                                            { currencyDisplay(Number(payableAmount)) }
                                        </b>
                                    </Typography>

                                    <Box>
                                        {
                                            apiResponse.display && (
                                                <Stack sx={{ width: '100%', my: 2 }}>
                                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                                </Stack>
                                            )
                                        }

                                        {
                                            couponDiscountDetails.status == "Pending" ?
                                                <Stack direction="row" alignItems="center" spacing="20px" justifyContent="center"
                                                    sx={{ mb: "10px", mt: "20px" }}
                                                >
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <TextField
                                                            sx={{
                                                                ...releaseTextFieldStyle,
                                                                width: "40%"
                                                            }}
                                                            label="Discount Percentage"
                                                            inputMode='numeric'
                                                            type='number'
                                                            size='small'
                                                            value={discountPercentage}
                                                            onChange={(e) => {
                                                                let value = Number(e.target.value);

                                                                if (value > 100) value = 100;
                                                                if (value < 0) value = 0;
                                                    
                                                                setDiscountPercentage(`${value}`);
                                                            }}
                                                        />
                                                    </Box>

                                                    <Stack direction="row" alignItems="center" spacing="10px" justifyContent="center">
                                                        <Box onClick={() => { handleApprove() }} sx={{
                                                            // p: "10px 29px 10px 29px",
                                                            p: "5px 15px",
                                                            borderRadius: "8px",
                                                            border: `1px solid ${kolors.primary}`,
                                                            color: kolors.milk,
                                                            bgcolor: kolors.primary,
                                                            cursor: "pointer",
                                                            ":hover": {
                                                                boxShadow: `1px 3px 18px 0px ${kolors.primary}`,
                                                                background: "linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)",
                                                                color: kolors.milk,
                                                            }

                                                        }}>
                                                            <Typography variant='body1' sx={{
                                                                fontWeight: '900',
                                                                fontSize: "18px",
                                                                // lineHeight: "40px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: 'center',
                                                            }}> Approve </Typography>
                                                        </Box>

                                                        <Box onClick={() => { rejectDiscount(couponDiscountDetails._id) }} sx={{
                                                            // p: "10px 29px 10px 29px",
                                                            p: "5px 15px",
                                                            borderRadius: "8px",
                                                            border: `1px solid ${kolors.primary}`,
                                                            color: kolors.dark,
                                                            cursor: "pointer",
                                                            ":hover": {
                                                                boxShadow: `1px 3px 18px 0px ${kolors.primary}`,
                                                                background: "linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)",
                                                                color: kolors.milk,
                                                            }

                                                        }}>
                                                            <Typography variant='body1' sx={{
                                                                fontWeight: '900',
                                                                fontSize: "18px",
                                                                // lineHeight: "40px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: 'center',
                                                            }}> Reject </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            :  <></>
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            }
        </Box>
    )
}
