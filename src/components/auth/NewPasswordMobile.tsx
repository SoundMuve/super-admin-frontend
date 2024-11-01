import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import newPasswordImg from "@/assets/images/auth/newPasswordImg.png";
import HeaderComponent from '../Header';
import colors from '@/constants/kolors';
import { authMuiTextFieldStyle, contentWidth } from '@/util/mui';
import { useNewPasswordAuth } from '@/hooks/auth/useNewPassword';

  
function NewPasswordMobileComponent() {

    const { 
        apiResponse, showPassword,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
        handleClickShowPassword,
    } = useNewPasswordAuth();
    

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
                                    src={newPasswordImg} 
                                    alt="create new password lock image" 
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
                            }}> Create new password </Typography>

                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "13px", md: "24px"},
                                lineHeight: {xs: "26.5px", md: "44.6px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.14px"},
                                textAlign: "center",
                                maxWidth: {xs: "284px", md: "377px"},
                                mx: "auto"
                            }}>
                                Your new password must be different form the previous one
                            </Typography>


                            <Box sx={{ py: 2 }}>
                                <Typography variant='body1' sx={{
                                    fontFamily: "Geist",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    lineHeight: "26.5px",
                                    letterSpacing: "-0.09px",
                                    textAlign: "left",
                                    color: colors.dark
                                }}> Password </Typography>

                                <TextField 
                                    id='password'
                                    type={showPassword ? "text" : 'password' }
                                    label=''
                                    inputMode='text'
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue=""
                                    InputLabelProps={{
                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{color: "grey"}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>,
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    
                                    error={ errors.password ? true : false }
                                    { ...register('password') }
                                />
                                { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                            </Box>

                            <Box sx={{ pb: 2 }}>
                                <Typography variant='body1' sx={{
                                    fontFamily: "Geist",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    lineHeight: "26.5px",
                                    letterSpacing: "-0.09px",
                                    textAlign: "left",
                                    color: colors.dark
                                }}>
                                    Confirm Password
                                </Typography>

                                <TextField 
                                    id='confirmPassword'
                                    type={showPassword ? "text" : 'password' }
                                    label=''
                                    inputMode='text'
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue=""
                                    InputLabelProps={{
                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{color: "gray"}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>,
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    
                                    error={ errors.confirmPassword ? true : false }
                                    { ...register('confirmPassword') }
                                />
                                { errors.confirmPassword && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.confirmPassword?.message }</Box> }

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
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                            </Button>

                        </form>
                    </Box>
                </Container>
            </Box>

        </Box>
    )
}

export default NewPasswordMobileComponent;