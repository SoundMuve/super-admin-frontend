import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VerifyEmailDesktopComponent from '@/components/auth/VerifyEmailDesktop';
import VerifyEmailMobileComponent from '@/components/auth/VerifyEmailMobile';

  
function VerifyEmail() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    if (xsMatches) {
        return <VerifyEmailMobileComponent />
    } else {
        return <VerifyEmailDesktopComponent />
    }

}

export default VerifyEmail;
