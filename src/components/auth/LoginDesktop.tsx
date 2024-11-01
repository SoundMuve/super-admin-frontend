import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import WestIcon from '@mui/icons-material/West';

import colors from '@/constants/kolors';
import bgImage from "@/assets/images/auth/background.png";
import soundMuve from "@/assets/images/soundMuve.png";
import { authMuiTextFieldStyle } from '@/util/mui';
import { useLoginAuth } from '@/hooks/auth/useLogin';


function LoginDesktopComponent() {
    const navigate = useNavigate();

    const { 
        apiResponse, handleClickShowPassword,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
        rememberMe, setRememberMe, showPassword, // setShowPassword, 
    } = useLoginAuth();

    return (
        <Box bgcolor={colors.bg} minHeight="100vh">

            <Grid container >
                <Grid item xs={12} md={6} >
                    <Box height="100%" 
                        sx={{
                            display: "grid",
                            placeItems: "center",

                            width: "100%",
                            minHeight: "100vh",

                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: "no-repeat",
                            // backgroundPosition: 'center',
                        }}
                    >
                        <Link to="/">
                            <img src={soundMuve} alt='soundMuve logo'
                                style={{
                                    width: "100%",
                                    maxWidth: "303.07px",
                                    height: "100%",
                                    maxHeight: "73.57px",
                                    objectFit: "contain",
                                    margin: "auto"
                                }}
                                
                            />
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box height="100%">
                        <Container>
                            <Box 
                                sx={{
                                    py: 4,
                                    px: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",

                                    boxShadow: "0px 1px 4px 0px #00000040",
                                    borderRadius: "70px 0 0 70px",

                                    bgcolor: "#FFFFFF",
                                    position: "absolute",
                                    right: 0,
                                    top: "60px",
                                    overflow: "hidden",
                                    width: "100%",

                                    maxWidth: "56%",
                                }}
                            >
                                <form noValidate onSubmit={ onSubmit } // onSubmit={ handleSubmit(onSubmit) } 
                                    style={{ maxWidth: "549px", width: "100%", alignSelf: "center" }}
                                >

                                    <WestIcon onClick={() => navigate(-1)} 
                                        sx={{ textAlign: "left", display: "block", cursor: "pointer" }} 
                                    />
        
                                    <Typography variant='h2' component="h2" sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "900",
                                        fontSize: {xs: 35, md: "40px"},
                                        lineHeight: {xs: "49.28px", md: "18px"},
                                        letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                                        mb: "16px",
                                        mt: "25px",
                                        color: "#000000",
                                        textAlign: "left"
                                    }}> Login </Typography>

                                    <Typography variant='body1' sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "300",
                                        fontSize: "16px",
                                        lineHeight: "12px",
                                        letterSpacing: "-0.2px",
                                        color: "#A4A4A4",
                                        textAlign: "left"
                                    }}>Welcome back, please log in your account</Typography>
        
                                    <Box sx={{ mt: "50px" }}>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='email'
                                            type='email'
                                            label=''
                                            placeholder='Email Address'
                                            autoFocus
                                            inputMode='email'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
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
        
                                    <Box sx={{ mt: "40px", mb: "25px" }}>
                                        <TextField 
                                            id='password'
                                            type={showPassword ? "text" : 'password' }
                                            label=''
                                            inputMode='text'
                                            variant="outlined" 
                                            placeholder='Password'
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

                                    <Stack direction="row" justifyContent="space-between" 
                                        alignItems="center" mb="30px"
                                    >
                                        <FormGroup>
                                            <FormControlLabel 
                                                control={
                                                    <Checkbox 
                                                        checked={rememberMe}
                                                        sx={{
                                                            color: "#D9D9D9",
                                                            '&.Mui-checked': {
                                                                color: colors.primary,
                                                            },
                                                        }}
                                                        onChange={(e) => {
                                                            // console.log(e.target.checked);
                                                            setRememberMe(e.target.checked);
                                                        }}
                                                    
                                                    />
                                                } 
                                                label={<Typography variant='body2' sx={{
                                                    fontFamily: "Geist",
                                                    fontWeight: "300",
                                                    fontSize: {xs: 14, md: "16px"},
                                                    lineHeight: "12px",
                                                    letterSpacing: "-0.2px",
                                                    color: "#A4A4A4"
                                                }}>Remember me</Typography>}
                                            />
                                        </FormGroup>

                                        <Typography sx={{
                                            fontFamily: "Geist",
                                            fontWeight: "300",
                                            fontSize: {xs: "10.69px", md: "16px"},
                                            lineHeight: {xs: "26.72px", md: "12px" },
                                            letterSpacing: {xs: "-0.09px", md: "-0.2px"}
                                        }}>
                                            <Link to="/auth/forgot-password" style={{
                                                textAlign: "right",
                                                color: colors.primary,
                                                float: 'right',
                                            }}>
                                                Forgot Password?
                                            </Link>
                                        </Typography>
                                    </Stack>
        
        
        
                                    {
                                        apiResponse.display && (
                                            <Stack sx={{ width: '100%', my: 2 }}>
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
                                            maxWidth: "106px",
                                            mx: "auto",
                                            "&.Mui-disabled": {
                                                background: "#c4c4c4",
                                                color: "#797979"
                                            },
                                            "&:hover": {
                                                bgcolor: "#0B0B0B"
                                            },
                                            "&:active": {
                                                bgcolor: "#0B0B0B"
                                            },
                                            "&:focus": {
                                                bgcolor: "#0B0B0B"
                                            },
                                            borderRadius: "12px",
                                            my: 2, 
                                            py: 1.5
                                        }}
                                    >
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Login</span>
                                        <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                    </Button>
        
                                    {/* <Box sx={{my: 2}}>
                                        <Typography sx={{
                                            fontFamily: "Geist",
                                            fontWeight: "300",
                                            fontSize: {xs: "10.69px", md: "16px"},
                                            lineHeight: {xs: "26.72px", md: "12px" },
                                            letterSpacing: {xs: "-0.09px", md: "-0.2px"},
                                            color: "#A4A4A4"
                                        }}>
                                            Don't have an account?
                                            <Link to='/auth/signup' style={{
                                                // fontWeight: "bold",
                                                color: colors.primary,
                                            }}> sign up </Link>
                                        </Typography>
                                    </Box> */}
                                </form>
                            </Box>
                        </Container>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default LoginDesktopComponent;
