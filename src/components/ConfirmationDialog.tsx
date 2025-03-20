import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


interface _Props {
    openDialog: boolean,
    setOpenDialog: (state: boolean) => void
    actionYes: () => void
    actionNo?: () => void
    title?: string
    description?: string
    isSubmitting: boolean
};

const ConfirmationDialog: React.FC<_Props> = ({
    openDialog, setOpenDialog,
    title = "Confirm", 
    description = "Are you sure, you want to proceed with this action?",
    isSubmitting,
    actionYes, actionNo = () => {}

}) => {

    return (
        <Dialog
            open={openDialog}
            onClose={()=> setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { title }
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { description }
                </DialogContentText>
            </DialogContent>


            <DialogActions>
                <Button onClick={()=> {
                    actionNo();
                    setOpenDialog(false)
                }}
                    disabled={isSubmitting}
                >No</Button>

                <Button autoFocus
                    disabled={isSubmitting}
                    onClick={() => actionYes()}
                >Yes
                    <CircularProgress color="secondary" size="20px"
                        sx={{
                            display: isSubmitting ? "initial" : "none"
                        }}
                    />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;