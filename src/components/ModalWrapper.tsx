import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import kolors from '@/constants/kolors';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    children: React.ReactNode,
}

const ModalWrapper: React.FC<_Props> = ({
    openModal, closeModal, children
}) => {

    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
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
                }}
            >
                <Box 
                    sx={{
                        bgcolor: kolors.bg,
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        p: "25px",
                        color: kolors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                        </IconButton>
                    </Box>

                    <Box> { children } </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalWrapper;