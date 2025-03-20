import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import kolors from '@/constants/kolors';
import { displayCreatedAtDate } from '@/util/dateTime';
import { promotionInterface } from '@/typeInterfaces/promotions.interface';
import { usePromotionsHook } from '@/hooks/promotions/usePromotionsHook';


interface _Props {
    openPromotionsModal: boolean,
    closePromotionsModal: (state: boolean) => void,
    promotion: promotionInterface,
    successFunc: () => void,
}

export const ViewPromotionsDataModal: React.FC<_Props> = ({
    openPromotionsModal, closePromotionsModal, promotion, successFunc
}) => {
    const [confrimationDialog, setConfrimationDialog] = useState(false);
    const [statusState, setStatusState] = useState(promotion.status);

    const {
        // apiResponse, setApiResponse,
        isUploadSuccessful,
        updatePromotion,
    } = usePromotionsHook();
    
    useEffect(() => {
        if (isUploadSuccessful) {
            closePromotionsModal(true);
        }
    }, [isUploadSuccessful]);
    

    return (
        <Modal
            open={openPromotionsModal}
            onClose={() => closePromotionsModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",

                    outline: "none",

                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)',

                    // maxWidth: {xs: "92%", sm: "496px"},
                }}
            >
                <Box p={2}
                    sx={{
                        bgcolor: kolors.milk,
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        // p: "25px",
                        color: kolors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        
                        <Stack direction="row" alignItems="center" justifyContent="space-between"
                            spacing="20px"
                            // sx={{
                            //     borderRadius: "8px",
                            //     background: `linear-gradient(90deg, ${ kolors.milk } 0%, #D68100 100%)`,
                            //     p: 2
                            // }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        // lineHeight: "16px",
                                        letterSpacing: "-0.34px",
                                        textAlign: "center",
                                        mb: 1,
                                    }}
                                >{ promotion.title }</Typography>
                            </Box>

                            <Box sx={{textAlign: "right"}}>
                                <IconButton onClick={() => closePromotionsModal(false)}>
                                    <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description'>
                        <Box>
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: "600",
                                }}
                            >Created By: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ promotion.createdBy.name }</span></Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Date: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ displayCreatedAtDate(promotion.createdAt) }</span>
                            </Typography>
                            
                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Display in: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ promotion.userType } dashboard</span>
                            </Typography>
                            
                            {/* <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Status: <span style={{ fontWeight: "bold", color: promotion.status ? "green" : 'red' }}
                                >{ promotion.status ? "Active" : "Inactive" }</span>
                            </Typography> */}

                            <Stack direction="row" alignItems="center" spacing={"1px"}
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                <Typography>Status: </Typography>

                                <Switch
                                    color='success'
                                    // defaultChecked={statusState}
                                    checked={statusState}
                                    onChange={(_e, checked) => {
                                        // console.log(checked);
                                        setStatusState(checked);

                                        updatePromotion(promotion._id, "status", checked, () => successFunc());
                                    }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />

                                <Typography sx={{ fontWeight: "bold", color: statusState ? "green" : 'red' }}
                                >{ statusState ? "Active" : "Inactive" }</Typography>
                            </Stack>
                        </Box>

                        <Box my={2}>
                            <img 
                                src={promotion.image}
                                alt={`${promotion.title} Promotional image`}
                                style={{
                                    width: "100%",
                                    // height: "100%",
                                    borderRadius: "8px",
                                    objectFit: "contain",
                                    backgroundColor: "grey"
                                }}
                            />
                        </Box>

                        <Stack sx={{ width: '100%', mt: 5, cursor: "pointer" }}>
                            <Alert variant="outlined" severity={"error"}
                                icon={<DeleteForeverOutlinedIcon fontSize="inherit" />}
                                sx={{ bgcolor: "#fdeded" }}
                                onClick={() => {
                                    setConfrimationDialog(true);

                                    // updatePromotion(promotion._id, "delete", true)
                                }}
                            >Delete forever</Alert>
                        </Stack>
                    </Box>
                </Box>


                <Dialog
                    // fullScreen={fullScreen}
                    open={confrimationDialog}
                    onClose={() => setConfrimationDialog(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Confirm
                    </DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions> 
                        <Button autoFocus onClick={() => setConfrimationDialog(false)}
                        >No</Button>

                        <Button autoFocus onClick={() => {
                            setConfrimationDialog(false);
                            updatePromotion(promotion._id, "delete", true, () => successFunc());
                            // closePromotionsModal(true);
                        }}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Modal>
    )
}
