import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import CloseIcon from '@mui/icons-material/Close';

import kolors from '@/constants/kolors';
import { useNewsletterHook } from '@/hooks/newsletter/useNewsletterHook';
import { newsletterMuiTextFieldStyle } from '@/util/mui';


const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        [{ font: [] }], // fonts
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        // ["link", "image", "video"],
        ["link", "image"],
        // ["undo", "redo"],
    ],
}

export default function SendNewsletter() {
    const navigate = useNavigate();
    // const [reactQuillValue, setReactQuillValue] = useState('');
    const [editorPreview, setEditorPreview] = useState(false);

    const {
        apiResponse, // setApiResponse,

        reactQuillValue, setReactQuillValue,

        errors,
        isValid,
        isSubmittingForm,
        sendNewsletterForm,
        onSubmit,
        register,
    } = useNewsletterHook();


    useEffect(() => {
        sendNewsletterForm.setValue(
            "message", reactQuillValue,
            { shouldDirty: true, shouldTouch: true, shouldValidate: true }
        );
    }, [reactQuillValue]);
    

    return (
        <Box my={5}>

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} mb={3}>
                <Typography
                    sx={{
                        color: "#7B7979",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "11.101px",
                        letterSpacing: "-0.463px",
                        mb: 3
                    }}
                >Send Newsletter</Typography>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box onClick={() => navigate("/admin/newsletter/subscribers")}
                        sx={{
                            borderRadius: "8px",
                            bgcolor: kolors.primary,
                            padding: "10px 23px",
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                color: kolors.milk,
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >Subscribers</Typography>
                    </Box>

                    <Box onClick={() => navigate("/admin/newsletter/history")}
                        sx={{
                            borderRadius: "8px",
                            bgcolor: "#fff",
                            padding: "10px 23px",
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                color: kolors.dark,
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >History</Typography>
                    </Box>
                </Stack>
            </Stack>

            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                <Box>
                    <form noValidate onSubmit={ onSubmit } >

                        <Box sx={{ mb: 2 }}>
                            <Typography variant='subtitle1'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "11.101px",
                                    letterSpacing: "-0.463px",
                                    my: 1
                                }}
                            >Newsletter Title</Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                placeholder=''
                                // autoFocus
                                defaultValue=""
                                size='small'
                                sx={{
                                    ...newsletterMuiTextFieldStyle
                                }}
                                error={ errors.title ? true : false }
                                { ...register('title') }
                            />
                            { errors.title && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.title?.message }</Box> }
                        </Box>

                        <Box minHeight={{xs: "420px", sm: "400px"}} position="relative">
                            <Box height="350px">
                                <ReactQuill 
                                    theme="snow" 
                                    value={reactQuillValue} 
                                    onChange={setReactQuillValue} 
                                    placeholder='Type your message here'
                                    className='ReactQuillIputStyle'
                                    modules={modules}
                                />
                            </Box>

                            <Stack direction="row" alignItems="center" 
                                spacing={2} 
                                sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    right: 10,
                                }}
                            >
                                <Button variant="contained" type="button" size='small'
                                    onClick={() => setEditorPreview(true)}
                                    sx={{ 
                                        bgcolor: kolors.milk,
                                        color: kolors.primary,
                                        width: "fit-content",

                                        "&:hover": {
                                            bgcolor: "#0B0B0B",
                                            color: kolors.milk,
                                        },
                                        "&:active": {
                                            bgcolor: "#0B0B0B",
                                            color: kolors.milk,
                                        },
                                        "&:focus": {
                                            bgcolor: "#0B0B0B",
                                            color: kolors.milk,
                                        },
                                        borderRadius: "12px",
                                        my: 2, 
                                        // py: 1.5
                                        textTransform: "none"
                                    }}
                                >Preview</Button>

                                <Button variant="contained" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmittingForm } 
                                    size='small'
                                    sx={{ 
                                        bgcolor: kolors.milk,
                                        color: kolors.primary,
                                        width: "fit-content",

                                        // "&.Mui-disabled": {
                                        //     background: "#c4c4c4",
                                        //     color: "#797979"
                                        // },
                                        "&:hover": {
                                            bgcolor: kolors.primary,
                                            color: kolors.milk,
                                        },
                                        "&:active": {
                                            bgcolor: kolors.primary,
                                            color: kolors.milk,
                                        },
                                        "&:focus": {
                                            bgcolor: kolors.primary,
                                            color: kolors.milk,
                                        },
                                        borderRadius: "12px",
                                        my: 2, 
                                        // py: 1.5
                                        textTransform: "none"
                                    }}
                                >
                                    <SendOutlinedIcon sx={{ fontSize: "16px", pr: "5px" }} />
                                    <span style={{ display: isSubmittingForm ? "none" : "initial" }}>Send</span>

                                    <CircularProgress size={25} sx={{ display: isSubmittingForm ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                                </Button>
                            </Stack>
                        </Box>

                        {/* { errors.message && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.message?.message }</Box> } */}


                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }
                        
                    </form>
                </Box>

            </Box>

            <PreviewModal 
                closePreviewModal={() => setEditorPreview(false)}
                openPreviewModal={editorPreview}
                previewValue={reactQuillValue}
            />
        </Box>
    )
}




interface _Props {
    openPreviewModal: boolean,
    closePreviewModal: (state: boolean) => void,
    previewValue: any,
}

const PreviewModal: React.FC<_Props> = ({
    openPreviewModal, closePreviewModal, previewValue
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
                        px: "15px",
                        // pt: "0px",
                        overflow: "scroll"
                    }}
                >
                    {/* <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closePreviewModal(false)}>
                            <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                        </IconButton>
                    </Box> */}

                    <Box bgcolor="#fff" dangerouslySetInnerHTML={{ __html: previewValue }} />
                </Box>
            </Box>
        </Modal>

    )

}
