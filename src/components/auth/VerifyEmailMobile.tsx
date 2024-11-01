import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import VerifyEmailImg from "@/assets/images/auth/VerifyEmailImg.png";
import colors from '@/constants/kolors';
import HeaderComponent from '../Header';
import { authMuiTextFieldStyle, contentWidth } from '@/util/mui';
import { useVerifyEmailAuth } from '@/hooks/auth/useVerifyEmail';

  
function VerifyEmailMobileComponent() {

    const { 
        apiResponse, isSubmitting, code, email, // userData,
        onSubmit,
        handleResendOtp, handleDelete, handlePaste, handleChange,
    } = useVerifyEmailAuth();


    return (
        <Box bgcolor={colors.bg} minHeight="100dvh">
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                // px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>
                <Container>
                    <Box sx={{
                        py: {xs: 5, sm: 10, md: 10},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <Box>
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

                            <Typography variant='h1' component="h1" sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "43px"},
                                lineHeight: {xs: "35px", md: "71px"},
                                letterSpacing: {xs: "1%", md: "-1.29px"},
                                my: 3
                            }}> Verify your email </Typography>

                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "13px", md: "24px"},
                                lineHeight: {xs: "28.87px", md: "44.6px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.14px"}
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

                            <Typography 
                                onClick={() => handleResendOtp()}
                                sx={{
                                    fontFamily: "Geist",
                                    fontWeight: "600",
                                    fontSize: {xs: "13px", md: "24px"},
                                    lineHeight: {xs: "28.87px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.14px"},
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
                                    bgcolor: colors.primary,
                                    color: colors.milk,
                                    "&.Mui-disabled": {
                                        background: "#c4c4c4",
                                        color: "#797979"
                                    },
                                    "&:hover": {
                                        bgcolor: colors.primary,
                                    },
                                    "&:active": {
                                        bgcolor: colors.primary,
                                    },
                                    "&:focus": {
                                        bgcolor: colors.primary,
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
                </Container>
            </Box>

        </Box>
    )
}

export default VerifyEmailMobileComponent;
