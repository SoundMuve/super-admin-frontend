import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


export type SnackbarToastInterface = {
    status: "error" | "info" | "success" | "warning";
    display: boolean;
    position?: {
        vertical: "top" | "bottom",
        horizontal: "left" | "center" | "right",
    };
    duration?: number;
    message: string;
    closeSnackbar?: () => void;
};

const SnackbarToast: React.FC<SnackbarToastInterface> = ({
    message, display, status, duration = 3000, closeSnackbar = () => {}, 
    position = {vertical: "top", horizontal: "right"}
}) => {
    let openMsgResponse = {
        display: display,
        status: status,
        message: message
    }


    const snackbarAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar()}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    
    return (
        <Snackbar
            anchorOrigin={position}
            open={openMsgResponse.display}
            autoHideDuration={duration}
            onClose={() => closeSnackbar()}
            message={openMsgResponse.message}
            action={snackbarAction}
        >
            <Alert 
                severity={openMsgResponse.status} 
                sx={{ width: '100%', zIndex: 999999999 }}
                onClose={() => closeSnackbar()}
            >
                { openMsgResponse.message }
            </Alert>
        </Snackbar>
    )
}

export default SnackbarToast;