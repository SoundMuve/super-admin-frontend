import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NewPasswordDesktopComponent from '@/components/auth/NewPasswordDesktop';
import NewPasswordMobileComponent from '@/components/auth/NewPasswordMobile';

  
function CreateNewPassword() {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    if (xsMatches) {
        return <NewPasswordMobileComponent />
    } else {
        return <NewPasswordDesktopComponent />
    }

}

export default CreateNewPassword;