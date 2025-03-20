import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";


interface _Props {
    openPreviewModal: boolean,
    closePreviewModal: (state: boolean) => void,
    previewValue: any,
    previewTitle: string,
    previewImage: string,
}

const PreviewPostModal: React.FC<_Props> = ({
    openPreviewModal, closePreviewModal, 
    previewValue, previewImage, previewTitle
}) => {

    return (
        <Modal
            open={openPreviewModal}
            onClose={() => closePreviewModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",

                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    
                    width: "100%",
                    maxWidth: {xs: "92%", sm: "90%", md: "85%"},
                    height: "100%",

                    // height: "100%",
                    outline: "none",
                }}
            >
                <Box 
                    sx={{
                        bgcolor: "#fff",
                        // color: colors.dark,
                        // width: "100%",
                        // maxWidth: {xs: "92%", sm: "90%", md: "85%"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "5px",
                        p: "15px",
                        mt: "1.5%",
                        // pt: "0px",
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closePreviewModal(false)} size='small'
                                sx={{ 
                                    position: "fixed", top: "25px", right: "10px",
                                    bgcolor: kolors.secondary,
                                    ":hover": {
                                        bgcolor: kolors.primary,
                                    }
                                }}
                            >
                                <CloseIcon sx={{color: "#fff", fontSize: "20px"}} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box id='payout-modal-description'>
                        <Box
                            sx={{
                                border: "1px solid #000000",
                                borderRadius: "16px",
                                overflow: "hidden",
                                maxHeight: {xs: "235px", md: "300px"},
                            }}
                        >
                            <img src={previewImage || featuredImagePlaceHolder} 
                                alt='blog post image'
                                style={{
                                    width: "100%",
                                    // height: "100%",
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                    backgroundColor: kolors.tertiary,
                                    // objectPosition: "top", // Aligns the image to the top
                                    display: "block", // Remove any default inline spacing
                                }}
                            />
                        </Box>

                        <Typography variant='h2'
                            sx={{
                                fontFamily: 'Nohemi',
                                fontWeight: {xs: "600", md: "700"},
                                fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                // lineHeight: "20px",
                                textAlign: "center",
                                color: kolors.dark,
                                my: 2,
                            }}
                        >{ previewTitle }</Typography>
                            
                        <Box bgcolor="#fff" dangerouslySetInnerHTML={{ __html: previewValue }} />
                    </Box>
                </Box>
            </Box>
        </Modal>

    )

}

export default PreviewPostModal;

