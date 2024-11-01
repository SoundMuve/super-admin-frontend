import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ForgotPasswordMobileComponent from '@/components/auth/ForgotPasswordMobile';
import ForgotPasswordDesktopComponent from '@/components/auth/ForgotPasswordDesktop';

  
function ForgotPassword() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    if (xsMatches) {
        return <ForgotPasswordMobileComponent />
    } else {
        return <ForgotPasswordDesktopComponent />
    }
    
}

export default ForgotPassword;
