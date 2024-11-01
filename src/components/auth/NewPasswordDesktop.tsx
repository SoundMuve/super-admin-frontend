import { useNavigate } from 'react-router-dom';

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
import WestIcon from '@mui/icons-material/West';

import newPasswordImg from "@/assets/images/auth/newPasswordImg.png";
import { authMuiTextFieldStyle } from '@/util/mui';
import colors from '@/constants/kolors';
import { useNewPasswordAuth } from '@/hooks/auth/useNewPassword';


  
function NewPasswordDesktopComponent() {
    const navigate = useNavigate();

    const { 
        apiResponse, showPassword,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
        handleClickShowPassword,
    } = useNewPasswordAuth();
    

    return (
        <Box bgcolor="#FFFFFF" minHeight="100vh">

            <Container>
                <Box sx={{
                    py: {xs: 5, sm: 10, md: 10},
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}>
                    <form noValidate onSubmit={ onSubmit } // onSubmit={ handleSubmit(onSubmit) } 
                        style={{
                            maxWidth: "653px",
                            width: "100%",
                            // height: 400,
                            alignSelf: "center"
                        }}
                    >
                        <WestIcon onClick={() => navigate(-1)} 
                            sx={{ textAlign: "left", alignSelf: "start", display: "block", cursor: "pointer" }} 
                        />

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

                        <Typography variant='h2' component="h2" sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "900",
                            fontSize: {xs: "35px", md: "40px"},
                            lineHeight: {xs: "49.28px", md: "18px"},
                            letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                            mb: 3
                        }}> Create new password </Typography>

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
                            Your new password must be different form the previous one
                        </Typography>


                        <Box sx={{ py: 2 }}>
                            <Typography variant='body1' sx={{
                                fontWeight: "400",
                                fontSize: "17.84px",
                                lineHeight: "44.6px",
                                letterSpacing: "-0.14px",
                                textAlign: "left"
                            }}> New Password </Typography>

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
                                        sx={{color: "gray"}}
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
                                fontWeight: "400",
                                fontSize: "15.38px17.84px",
                                lineHeight: "44.6px",
                                letterSpacing: "-0.14px",
                                textAlign: "left"
                            }}> Confirm Password </Typography>

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
                                        sx={{color: "grey"}}
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
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                        </Button>

                    </form>
                </Box>
            </Container>
        </Box>
    )
}

export default NewPasswordDesktopComponent;