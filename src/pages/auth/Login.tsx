import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginMobileComponent from '@/components/auth/LoginMobile';
import LoginDesktopComponent from '@/components/auth/LoginDesktop';

  
function Login() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));


    if (xsMatches) {
        return <LoginMobileComponent />
    } else {
        return <LoginDesktopComponent />
    }
    
}

export default Login;
