import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import LoadingDataComponent from '@/components/LoadingData';
import { useGeneralStore } from '@/state/generalStore';
import { useNewsletterHook } from '@/hooks/newsletter/useNewsletterHook';
import { displayCreatedAtDate } from '@/util/dateTime';
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { copyToClipboard } from '@/util/copyNshare';


export default function NewsletterDetails() {
    const navigate = useNavigate();
    const {_id} = useParams();

    const newsLetterDetails = useGeneralStore((state) => state.newsLetterDetails);

    const {
        // apiResponse, setApiResponse,
        isSubmitting,
        getSentNewsLetterById
    } = useNewsletterHook();


    useEffect(() => {
        if (_id) {
            getSentNewsLetterById(_id);
        } else {
            if (newsLetterDetails._id) {
                getSentNewsLetterById(newsLetterDetails._id);
            } else {
                navigate("/admin");
            }
        }
    }, [_id]);



    return (
        <Box my={5} >
            {
                isSubmitting ? <LoadingDataComponent />
                : 
                <Box>
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
                        >Newsletter Message Details</Typography>
                    </Stack>

                    <Box borderRadius="8px" bgcolor="#fff" p={2}>
                        <Box>
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >Sent By: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ newsLetterDetails.sentBy.name }</span></Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >
                                No. of Recipients: <span style={{ fontWeight: "bold", color: kolors.dark }}
                                >{ newsLetterDetails.recipients.length }</span>
                            </Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",

                                    ...numberOfLinesTypographyStyle(2),
                                }}
                            >
                                Recipients: <span style={{ fontSize: "13px", fontWeight: "bold", color: kolors.dark }}
                                    title="Click to copy" 
                                    onClick={() => copyToClipboard(newsLetterDetails.recipients.toString())}
                                >{ newsLetterDetails.recipients.map((value) => (value + ", ")) }</span>
                            </Typography>
                            
                            {/* <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",

                                    ...numberOfLinesTypographyStyle(2),
                                }}
                            >
                                Failed Recipients: <span style={{ fontSize: "13px", fontWeight: "bold", color: kolors.dark }}
                                >{ newsLetterDetails.failedRecipients.map((value) => (value + ", ")) }</span>
                            </Typography> */}
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Date: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ displayCreatedAtDate(newsLetterDetails.createdAt) }</span>
                            </Typography>
                        </Box>

                        <Box my={4}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: kolors.dark,
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                        my: 1
                                    }}
                                >Title</Typography>

                                <Typography component="div"
                                    sx={{
                                        color: "#686868",
                                        fontSize: {xs: "14px", md: "16px"},
                                    }}
                                >{ newsLetterDetails.title }</Typography>
                            </Box>

                            <Box mt={3}>
                                <Typography
                                    sx={{
                                        color: kolors.dark,
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                        my: 1
                                    }}
                                >Message</Typography>

                                <Box component="div"
                                    sx={{
                                        // color: "#686868",
                                        // fontSize: {xs: "14px", md: "16px"},
                                    }}

                                    dangerouslySetInnerHTML={{ __html: newsLetterDetails.message }}
                                />
                            </Box>
                        </Box>

                    </Box>
                </Box>
            }
        </Box>
    )
}
