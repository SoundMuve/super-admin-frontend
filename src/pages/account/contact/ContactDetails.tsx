import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { contactMuiTextFieldStyle } from '@/util/mui';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import TextField from '@mui/material/TextField';
import LoadingDataComponent from '@/components/LoadingData';
import { useGeneralStore } from '@/state/generalStore';
import { useContactHook } from '@/hooks/contacts/useContactHook';
import { displayCreatedAtDate } from '@/util/dateTime';
import Alert from '@mui/material/Alert';


export default function ContactDetails() {
    const navigate = useNavigate();
    const {_id} = useParams();
    const [replyMsg, setReplyMsg] = useState('');

    const contactDetails = useGeneralStore((state) => state.contactDetails);

    const {
        apiResponse, setApiResponse,
        isSubmitting,
        getContactMessagesById,
        sendReplyMsg,
    } = useContactHook();


    useEffect(() => {
        if (_id) {
            getContactMessagesById(_id);
        } else {
            if (contactDetails._id) {
                getContactMessagesById(contactDetails._id);
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
                        >Contact Message Details</Typography>
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
                            >Sender Name: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ contactDetails.name }</span></Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >Sender Email: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ contactDetails.email }</span></Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Date: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ displayCreatedAtDate(contactDetails.createdAt) }</span>
                            </Typography>
                        </Box>

                        <Box my={4}>
                            <Typography
                                sx={{
                                    color: "#EEEEEE",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >Message</Typography>

                            <Typography component="div"
                                sx={{
                                    color: "#686868",
                                    fontSize: {xs: "14px", md: "16px"},
                                }}
                            >
                                <pre>{ contactDetails.message }</pre>
                            </Typography>

                            <Box mt={2.5}>
                                { contactDetails.reply.map((reply, index) => (
                                    <Stack direction="row" justifyContent="right" mt={1} key={index}>
                                        <Typography component="div"
                                            sx={{
                                                width: "90%",
                                                // bgcolor: kolors.bg,
                                                bgcolor: "#F0F0F0",
                                                px: 2,
                                                borderRadius: "10px",
                                                // float: "right"
                                            }}
                                        >
                                            <pre>{ reply.message }</pre>

                                            <div style={{
                                                textAlign: "right", fontSize: "12px", 
                                                margin: "5px 0", 
                                            }}>
                                                { reply.name }
                                                <br />
                                                { displayCreatedAtDate(reply.date) }
                                            </div>
                                        </Typography>
                                    </Stack>
                                )) }

                            </Box>
                        </Box>


                        <Box>
                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', my: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }
                            
                            <Typography
                                sx={{
                                    color: "#EEEEEE",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >Reply</Typography>

                            <Box sx={{ position: "relative", mt: 1 }}>
                                <TextField multiline fullWidth
                                    rows={10}
                                    placeholder='Type your message here'
                                    inputMode='text'
                                    size='small'

                                    value={replyMsg}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setReplyMsg(value);

                                        setApiResponse({
                                            display: false,
                                            status: true,
                                            message: ""
                                        })
                                    }}

                                    sx={{
                                        ...contactMuiTextFieldStyle,
                                    }}
                                />

                                <Box 
                                    onClick={async () => {
                                        if (replyMsg.length > 5) {
                                            const reply = await sendReplyMsg(replyMsg, contactDetails._id);

                                            if (reply) setReplyMsg("");
                                        } else {
                                            setApiResponse({
                                                display: true,
                                                status: false,
                                                message: "Please enter a complete message."
                                            });
                                        };
                                    }} 
                                    sx={{
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
                                        },
                                        width: "fit-content",
                                        position: "absolute",
                                        right: "20px",
                                        bottom: "20px"

                                    }}
                                >
                                    <Typography variant='body1' sx={{
                                        fontWeight: '500',
                                        fontSize: "16px",
                                        // lineHeight: "40px",
                                        letterSpacing: "-0.13px",
                                        textAlign: 'center',
                                    }}> Send </Typography>
                                </Box>


                            </Box>

                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}
