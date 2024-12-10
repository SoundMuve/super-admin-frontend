import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

import kolors from '@/constants/kolors';
import { userInterface } from '@/typeInterfaces/users.interface';
import EmptyListComponent from '@/components/EmptyList';


interface _Props {
    openKycDataModal: boolean,
    closeKycDataModal: (state: boolean) => void,
    userData: userInterface,
}

export const KycDataModal: React.FC<_Props> = ({
    openKycDataModal, closeKycDataModal, userData
}) => {


    return (
        <Modal
            open={openKycDataModal}
            onClose={() => closeKycDataModal(false) }
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
                        bgcolor: "#fff", // kolors.milk,
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
                                >KYC Details</Typography>
                            </Box>

                            <Box sx={{textAlign: "right"}}>
                                <IconButton onClick={() => closeKycDataModal(false)}>
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
                                    // fontWeight: {xs: "400", md: "400"},
                                }}
                            >
                                Submitted: <span style={{ fontWeight: "bold", color: userData.kyc.isKycSubmitted ? "green" : 'red' }}
                                >{ userData.kyc.isKycSubmitted ? "True" : "False" }</span>
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#686868",
                                    // fontFamily: "Geist",
                                    fontSize: {xs: "14px", md: "16px"},
                                    // fontWeight: {xs: "400", md: "400"},
                                    display: userData.kyc.isKycSubmitted ? "initial" : "none",
                                }}
                            >
                                Phone number: <span style={{ fontWeight: "bold", color: kolors.dark }}>{ userData.kyc.phoneNumber }</span>
                            </Typography>

                        </Box>

                        <Box mt={4} mb={3}>
                            {
                                userData.kyc.securityQuestions.length ?
                                    userData.kyc.securityQuestions.map((kycData, index) => (
                                        <Box mb={3} key={index}>
                                            <Typography
                                                sx={{
                                                    color: kolors.primary,
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                    lineHeight: "16px",
                                                    letterSpacing: "-0.34px"
                                                }}
                                            >{ kycData.question }</Typography>

                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "13px",
                                                    fontWeight: "400",
                                                    lineHeight: "16px",
                                                    letterSpacing: "-0.34px",

                                                    borderRadius: "4px",
                                                    border: "1px solid #000",
                                                    p: 1,
                                                    mt: 1
                                                }}
                                            >{ kycData.answer }</Typography>
                                        </Box>
                                    ))
                                : <EmptyListComponent notFoundText="This user is yet to submit their KYC details" />
                            }
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
