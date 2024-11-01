import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import WestIcon from '@mui/icons-material/West';

import VerifyEmailImg from "@/assets/images/auth/VerifyEmailImg.png";
import { authMuiTextFieldStyle } from '@/util/mui';
import colors from '@/constants/kolors';
import { useVerifyEmailAuth } from '@/hooks/auth/useVerifyEmail';


  
function VerifyEmailDesktopComponent() {
    const navigate = useNavigate();

    const { 
        apiResponse, isSubmitting, code, email, // userData,
        onSubmit,
        handleResendOtp, handleDelete, handlePaste, handleChange,
    } = useVerifyEmailAuth();


    return (
        <Box bgcolor="#FFFFFF" minHeight="100vh">

            <Container>
                <Box sx={{
                    py: {xs: 5, sm: 10, md: 10},
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}>
                    <Box sx={{
                        maxWidth: "653px",
                        width: "100%",
                    }}>
                        <WestIcon onClick={() => navigate(-1)} 
                            sx={{ textAlign: "left", alignSelf: "start", display: "block", cursor: "pointer" }} 
                        />

                        <Box  
                            sx={{
                                maxWidth: "653px",
                                width: "100%",
                                // height: 400,
                                alignSelf: "center"
                            }}
                        >
                            <Box sx={{
                                maxWidth: "214px",
                                width: {xs: `${214 * 0.3}px`, md: `${214 * 0.6}px`},
                                textAlign: "center",
                                mx: "auto",
                            }}>
                                <img 
                                    src={VerifyEmailImg} 
                                    alt="verify email lock image" 
                                    style={{ width: "100%", objectFit: "contain" }} 
                                />
                            </Box>

                            <Typography variant='h2' component="h2" sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "40px"},
                                lineHeight: {xs: "49.28px", md: "18px"},
                                letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                                mb: 3,
                                mt: "30px"
                            }}> Verify your email </Typography>

                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "16px", md: "24px"},
                                lineHeight: {xs: "26.5px", md: "34.6px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.14px"},
                                textAlign: "center",
                                maxWidth: {xs: "284px", md: "466px"},
                                mx: "auto",
                                color: "#7B7979"
                            }}>
                                Please enter the 4 digit code sent to <br />
                                <span style={{fontWeight: "700"}}>
                                    { email }
                                </span>
                            </Typography>


                            <Box sx={{ py: 2, }}>
                                <Box sx={{ 
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "15px",
                                    mx: "auto",
                                    // bgcolor: "green",
                                    textAlign: "center"
                                }}>
                                    { code.map((data, i) => (

                                        <TextField 
                                            key={i}
                                            variant="outlined" 
                                            // fullWidth 
                                            // id={`code${i}`}
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            // defaultValue=""
                                            
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            sx={{
                                                ...authMuiTextFieldStyle
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                    textAlign: "center",
                                                    // bgcolor: "yellow",
                                                    width: {xs: "70px", sm: "80px", md: "121px"},
                                                    height: {xs: "70px", sm: "70px", md: "100px" }
                                                },
                                            }}

                                            inputProps={{ 
                                                maxLength: 1, 
                                                id: `code${i}`,
                                                className: "otpCode",
                                                style: { textAlign: "center" }
                                            }}

                                            error={ apiResponse.display && apiResponse.status == false ? true : false }

                                            value={data}
                                            onChange={(e) => handleChange(e, i)}
                                            onPaste={(e) => handlePaste(e)}
                                            onKeyUp={(e) => handleDelete(e, i)}
                                        />
                                    )) }

                                </Box>
                            </Box>

                            <Typography variant='body1'onClick={() => handleResendOtp()}
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "24px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                    mb: 2,
                                    cursor: "pointer"
                                }}
                            > Resend Code </Typography>


                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Button variant="contained" 
                                fullWidth type="button" 
                                disabled={ code.join('').length !== 4 || isSubmitting } 
                                onClick={() => onSubmit()}
                                sx={{ 
                                    bgcolor: "#0B0B0B",
                                    color: "#fff",
                                    maxWidth: "335px",
                                    "&.Mui-disabled": {
                                        background: "#c4c4c4",
                                        color: "#797979"
                                    },
                                    "&:hover": {
                                        bgcolor: "#0B0B0B",
                                    },
                                    "&:active": {
                                        bgcolor: "#0B0B0B",
                                    },
                                    "&:focus": {
                                        bgcolor: "#0B0B0B",
                                    },
                                    borderRadius: "12px",
                                    my: 2, 
                                    py: 1.5,
                                    textTransform: "unset"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                            </Button>

                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}

export default VerifyEmailDesktopComponent;
