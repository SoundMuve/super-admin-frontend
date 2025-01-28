import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import colors from '@/constants/kolors';
import ModalWrapper from '@/components/ModalWrapper';
import { useGetReleases } from '@/hooks/releases/useGetReleases';
import { paymentTextFieldStyle, submitBtnStyle } from '@/util/mui';
import { releaseInterface, songInterface } from '@/typeInterfaces/release.interface';


interface _Props {
    openUPC_EAN_ISRC_Modal: boolean;
    closeUPC_EAN_ISRC_Modal: (state: boolean) => void;
    releaseDetails: releaseInterface;
    songDetails: songInterface
};

const UpdateUPC_EAN_ISRC_ModalComponent: React.FC<_Props> = ({
    openUPC_EAN_ISRC_Modal, closeUPC_EAN_ISRC_Modal,
    releaseDetails, songDetails
}) => {
    const [upcEanCode, setUpcEanCode] = useState(releaseDetails.upc_ean);
    const [isrcNumber, setIsrcNumber] = useState(songDetails.isrcNumber);

    const {
        apiResponse, setApiResponse,
        handleUpdateUPC_EAN_ISRC
    } = useGetReleases();

    const handleSubmit = () => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        if (!upcEanCode) {
            setApiResponse({
                display: true,
                status: true,
                message: "UPC/EAN code is required."
            });
            return;
        }

        if (!isrcNumber) {
            setApiResponse({
                display: true,
                status: true,
                message: "ISRC Number is required."
            });

            return;
        }

        handleUpdateUPC_EAN_ISRC(
            releaseDetails._id, songDetails._id,
            upcEanCode, isrcNumber,
            closeUPC_EAN_ISRC_Modal(false) 
        );
    }


    return (
        <ModalWrapper 
            closeModal={() => closeUPC_EAN_ISRC_Modal(false) } 
            openModal={openUPC_EAN_ISRC_Modal} 
        >
            <Box>
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

                <Box>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> ISRC Number </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='isrcNumber'
                        type='text'
                        inputMode='text'
                        // defaultValue=""
                        value={isrcNumber}
                        sx={paymentTextFieldStyle}
                        onChange={(e) => {
                            const value = e.target.value;
                            setIsrcNumber(value);
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
                        onClick={() => handleSubmit()} 
                        disabled={ !upcEanCode.length || !isrcNumber.length } 
                        sx={{
                            ...submitBtnStyle,
                        }}
                    > Submit </Button>
                </Box>

            </Box>
        </ModalWrapper>
    )
}

export default UpdateUPC_EAN_ISRC_ModalComponent;