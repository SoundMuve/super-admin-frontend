import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import colors from '@/constants/kolors';
import ModalWrapper from '@/components/ModalWrapper';
import { getStatusColor } from '@/util/resources';
import { useGetReleases } from '@/hooks/releases/useGetReleases';
import { paymentTextFieldStyle, submitBtnStyle } from '@/util/mui';
import { releaseInterface } from '@/typeInterfaces/release.interface';


interface _Props {
    openUpdateLiveStatusModal: boolean;
    closeUpdateLiveStatusModal: (state: boolean) => void;
    releaseDetails: releaseInterface;
    selectedStatus: "Incomplete" | "Unpaid" | "Processing" |  "Pre-Saved" | "Live" | "Failed"
};

const UpdateStatusModalComponent: React.FC<_Props> = ({
    openUpdateLiveStatusModal, closeUpdateLiveStatusModal,
    releaseDetails, selectedStatus,
}) => {
    const [linktreeUrl, setLinktreeUrl] = useState('');
    const [upcEanCode, setUpcEanCode] = useState(releaseDetails.upc_ean);

    const {
        apiResponse, // setApiResponse,
        handleSubmitLiveStatus
    } = useGetReleases();

    return (
        <ModalWrapper 
            closeModal={() => closeUpdateLiveStatusModal(false) } 
            openModal={openUpdateLiveStatusModal} 
        >
            <Box>
                <Stack direction="row" spacing="20px" alignItems="center" mb={2}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> Status: </Typography>

                    <Box 
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            // borderRadius: "6px",
                            color: getStatusColor(selectedStatus || releaseDetails.status, 'text'),
                            bgcolor: getStatusColor(selectedStatus || releaseDetails.status, "bg"),
                        }}
                    >
                        <Typography variant='body1'
                        >{ selectedStatus }</Typography>
                    </Box>
                </Stack>

                <Box>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> Linktree Url </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='linktreeUrl'
                        type='text'
                        inputMode='text'
                        // defaultValue=""
                        value={linktreeUrl}
                        sx={paymentTextFieldStyle}
                        onChange={(e) => {
                            const value = e.target.value;
                            setLinktreeUrl(value);
                        }}
                    />
                </Box>

                <Box mt={2}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> UPC/EAN Code </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='upcEanCode'
                        type='text'
                        inputMode='text'
                        // defaultValue=""
                        value={upcEanCode}
                        sx={paymentTextFieldStyle}
                        onChange={(e) => {
                            const value = e.target.value;
                            setUpcEanCode(value);
                        }}
                    />
                </Box>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', my: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }
                
                <Box 
                    sx={{ 
                        my: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Button variant="contained" 
                        fullWidth type="button"
                        onClick={() => handleSubmitLiveStatus(
                            selectedStatus, releaseDetails._id, 
                            linktreeUrl, upcEanCode,
                            closeUpdateLiveStatusModal(false) 
                        )} 
                        disabled={ !linktreeUrl.length } 
                        sx={{
                            ...submitBtnStyle,
                        }}
                    > Submit </Button>
                </Box>

            </Box>
        </ModalWrapper>
    )
}

export default UpdateStatusModalComponent;