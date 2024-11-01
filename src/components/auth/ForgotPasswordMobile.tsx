import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import resetPasswordImg from "@/assets/images/auth/newPassword.png";
// import SnackbarToast from '@/components/ToastNotification';
import colors from '@/constants/kolors';
import { authMuiTextFieldStyle, contentWidth } from '@/util/mui';
import HeaderComponent from '@/components/Header';
import { useForgotPasswordAuth } from '@/hooks/auth/useForgotPassword';

  
function ForgotPasswordMobileComponent() {

    const { 
        apiResponse, // toastNotification, setToastNotification,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
    } = useForgotPasswordAuth();

    
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
                        <form noValidate onSubmit={ onSubmit } >
                            <Box sx={{
                                maxWidth: "214px",
                                width: {xs: `${214 * 0.3}px`, md: `${214 * 0.6}px`},
                                textAlign: "center",
                                mx: "auto"
                            }}>
                                <img 
                                    src={resetPasswordImg} 
                                    alt="reset password lock image" 
                                    style={{ width: "100%" }} 
                                />
                            </Box>

                            <Typography variant='h1' component="h1" sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "43px"},
                                lineHeight: {xs: "35px", md: "71px"},
                                letterSpacing: {xs: "1%", md: "-1.29px"},
                                my: 3
                            }}> Reset Password </Typography>

                            <Typography sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "13px", md: 24},
                                lineHeight: {xs: "26.23px", md: "44.6px"},
                                letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                textAlign: "center"
                            }}>
                                Please enter an email adddress to recieve verification code
                            </Typography>


                            <Box sx={{ py: 2 }}>
                                <Typography variant='body1' sx={{
                                    fontFamily: "Geist",
                                    fontWeight: "300",
                                    textAlign: "left", 
                                    fontSize: {xs: "13px", md: "17.84px"}, 
                                    letterSpacing: {xs: "-0.69px", md: "-0.14px"},
                                    lineHeight: {xs: "30.69px", md: "44.6px" },
                                }}>
                                    Email Address
                                </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='email'
                                    type='email'
                                    label=''
                                    autoFocus
                                    inputMode='email'
                                    defaultValue=""
                                    InputLabelProps={{
                                        // style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    error={ errors.email ? true : false }
                                    { ...register('email') }
                                />
                                { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                            </Box>


                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Button variant="contained" 
                                fullWidth type="submit" 
                                disabled={ !isValid || isSubmitting } 
                                sx={{ 
                                    bgcolor: colors.primary,
                                    color: colors.milk,
                                    "&.Mui-disabled": {
                                        bgcolor: "#c4c4c4",
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
                                    textTransform: "none"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                            </Button>

                        </form>
                    </Box>
                </Container>
            </Box>

        </Box>
    )
}

export default ForgotPasswordMobileComponent;
