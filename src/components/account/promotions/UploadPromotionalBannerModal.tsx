import { ChangeEvent, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import ModalWrapper from '@/components/ModalWrapper';
import kolors from '@/constants/kolors';
import { usePromotionsHook } from '@/hooks/promotions/usePromotionsHook';
import { 
    artWorkAllowedTypes, convertToBase64, validatePromotionalBannerImage 
} from '@/util/resources';


interface _Props {
    openUploadBannerModal: boolean,
    closeUploadBannerModal: (state: boolean) => void,
}

export const UploadPromotionalBannerModal: React.FC<_Props> = ({
    openUploadBannerModal, closeUploadBannerModal
}) => {
    const {
        apiResponse, setApiResponse,

        errors,
        isValid,
        // isSubmittingForm,
        uploadBannerForm,
        onSubmit,
        register,

        isUploadSuccessful,

        // image, 
        setImage,
        imagePreview, setImagePreview,

    } = usePromotionsHook();
    
    const [openDescriptionTooltip, setOpenDescriptionTooltip] = useState(false);

    useEffect(() => {
        if (openUploadBannerModal) {
            uploadBannerForm.setValue(
                "userType", "All",
                {shouldDirty: true, shouldTouch: true, shouldValidate: true}
            );

        } else {
            uploadBannerForm.reset();

            setImage(null);
            setImagePreview(undefined);
            
            setApiResponse({
                display: false,
                status: true,
                message: '',
            });
        }
    }, [openUploadBannerModal]);

    useEffect(() => {
        if (isUploadSuccessful) {
            closeUploadBannerModal(false);
        }
    }, [isUploadSuccessful]);
    

    const handleImageFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        // const file = e.target.files[0]; 
        const file = e.target.files?.[0];
        if (!file) return;
        
        const validateResult = await validatePromotionalBannerImage(file);
        setApiResponse(validateResult);
        if (!validateResult.status) return;
    
        const base64 = await convertToBase64(file);
        if (base64.status && base64.result) {
            setImage(file);
            setImagePreview(base64.result);

            uploadBannerForm.setValue(
                "image", base64.result,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true}
            );

        } else {
            setImage(null);
            setImagePreview(undefined);
        }
    
        e.target.value = "";
    }


    return (
        <ModalWrapper 
            closeModal={() => closeUploadBannerModal(false) } 
            openModal={openUploadBannerModal} 
        >
            <Box>
                <Typography sx={{
                    fontWeight: "900",
                    fontSize: "24px",
                    // lineHeight: "16px",
                    letterSpacing: "-0.34px",
                    textAlign: "center",
                    mb: 1,
                }}> Add New Promotional Banner </Typography>

                <Box>
                    <form noValidate onSubmit={ onSubmit }>
                        <Box>
                            <TextField variant="outlined" fullWidth
                                size='small'
                                type='text'
                                label=''
                                placeholder='Title (optional)'
                                inputMode='text'
                                InputLabelProps={{
                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                }}
                                
                                error={ errors.title ? true : false }
                                { ...register('title') }
                            />
                            { errors.title && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.title?.message }</Box> }
                        </Box>

                        <Box mt={2}>
                            <Typography
                                sx={{
                                    color: "grey",
                                    fontSize: "15px",
                                    mb: 0.5
                                }}
                            >Display in</Typography>
                            {/* >Select User Dashboard Type</Typography> */}

                            <Select fullWidth
                                // id="sortReleases"
                                
                                defaultValue="All"
                                size='small'

                                error={ errors.userType ? true : false }
                                { ...register('userType') }

                                sx={{
                                    color: kolors.milk,
                                    borderRadius: "6px",
                                    bgcolor: kolors.primary,
                                    border: "none",

                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: kolors.primary,
                                        border: "none",
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(228, 219, 233, 0.25)',
                                        border: "none",
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--TextField-brandBorderHoverColor)',
                                        border: "none",
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: kolors.milk,
                                    }
                                }}

                                // onChange={(event) => {
                                //     const value: any = event.target.value;
                                //     console.log(value);
                                //     // getReleases(1, limitNo, value);
                                // }}
                            >
                                <MenuItem value="All">
                                    All Dashboard
                                </MenuItem>

                                <MenuItem value="artist">
                                    Artist Dashboard
                                </MenuItem>

                                <MenuItem value="record label">
                                    Record Label Dashboard
                                </MenuItem>
                            </Select>

                            { errors.userType && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.userType?.message }</Box> }
                        </Box>

                        <Box mt={2}
                            sx={{
                                borderRadius: "8px",
                                bgcolor: kolors.milk,
                                color: kolors.primary,
                                ":hover": {
                                    bgcolor: "#fff",
                                    color: kolors.dark,
                                },
                                padding: "10px 15px",
                                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}
                                sx={{ cursor: "pointer", flexGrow: 1, }}
                                onClick={() => document.getElementById("uploadImageInput")?.click()}
                            >
                                <CloudUploadOutlinedIcon sx={{ fontSize: "18px" }} />

                                <Typography
                                    sx={{
                                        // color: kolors.milk,
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        lineHeight: "13px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >Upload banner</Typography>
                            </Stack>
                                                
                            <Box>
                                <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)}>
                                    <div>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            placement='right'
                                            arrow
                                            onClose={() => setOpenDescriptionTooltip(false)}
                                            open={openDescriptionTooltip}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener

                                            title={<Box
                                                sx={{
                                                    // minWidth: 250,
                                                    // maxWidth: 700,
                                                    maxHeight: 450,
                                                    overflow: "scroll"
                                                }}
                                            >
                                                <Typography variant='h3' component="h3"
                                                    sx={{
                                                        fontWeight: '700',
                                                        fontSize: "23px"
                                                    }}
                                                > Requirements Checklist </Typography>

                                                <Typography variant='body1' fontSize="14px">
                                                    Promotional image must meet all of these requirements.
                                                </Typography>


                                                <List>
                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                                            </ListItemIcon>

                                                            <ListItemText 
                                                                primary={<Box>
                                                                    <Typography variant='h4' component='h4'
                                                                        sx={{
                                                                            fontSize: '1rem',
                                                                            fontWeight: '700',
                                                                            lineHeight: 1.5,
                                                                            color: 'white'
                                                                        }}
                                                                    >
                                                                        JPG, PNG or GIF image file smaller than 1MB.
                                                                    </Typography>

                                                                    <Typography variant='body2'
                                                                        sx={{
                                                                            fontSize: '12px',
                                                                            fontStyle: 'italic'
                                                                        }}
                                                                    >
                                                                        File must be in RGB mode, even if your image is black and white.
                                                                    </Typography>
                                                                </Box>} 
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                                            </ListItemIcon>

                                                            <ListItemText 
                                                                primary={<Box>
                                                                    <Typography variant='h4' component='h4'
                                                                        sx={{
                                                                            fontSize: '1rem',
                                                                            fontWeight: '700',
                                                                            lineHeight: 1.5,
                                                                            color: 'white'
                                                                        }}
                                                                    >
                                                                        Must be 4264 x 1320 pixels in size.
                                                                    </Typography>

                                                                    {/* <Typography variant='body2'
                                                                        sx={{
                                                                            fontSize: '12px',
                                                                            fontStyle: 'italic'
                                                                        }}
                                                                    >
                                                                        iTunes recommends files be 3000 x 3000 pixels.
                                                                    </Typography> */}
                                                                </Box>} 
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                                            </ListItemIcon>

                                                            <ListItemText 
                                                                primary={<Box>
                                                                    <Typography variant='h4' component='h4'
                                                                        sx={{
                                                                            fontSize: '1rem',
                                                                            fontWeight: '700',
                                                                            lineHeight: 1.5,
                                                                            color: 'white'
                                                                        }}
                                                                    >
                                                                        No blurriness, pixelation, or white space.
                                                                    </Typography>
                                                                </Box>} 
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </List>

                                            </Box>}
                                        >
                                            <IconButton size='small' 
                                                onClick={() => setOpenDescriptionTooltip(!openDescriptionTooltip)} 
                                                aria-label="More Information"
                                            >
                                                <InfoOutlinedIcon sx={{ fontSize: "18px" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </Box>
                        </Box>


                        { imagePreview && 
                            <Box mt={3}>
                                <img 
                                    src={imagePreview} alt='uploaded promotional image'
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        // height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>
                        }


                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }
                                    
                        <Button variant="contained" 
                            fullWidth type="submit" 
                            size='medium'
                            disabled={ !isValid || uploadBannerForm.formState.isSubmitting } 
                            sx={{ 
                                bgcolor: "#0B0B0B",
                                color: "#fff",

                                "&.Mui-disabled": {
                                    background: "#c4c4c4",
                                    color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: kolors.tertiary
                                },
                                "&:active": {
                                    bgcolor: kolors.tertiary
                                },
                                "&:focus": {
                                    bgcolor: kolors.tertiary
                                },
                                borderRadius: "12px",
                                mt: 4, 
                                // py: 1.5
                            }}
                        >
                            <span style={{ display: uploadBannerForm.formState.isSubmitting ? "none" : "initial" }}>Sumbit</span>
                            <CircularProgress size={25} 
                                sx={{ 
                                    display: uploadBannerForm.formState.isSubmitting ? "initial" : "none", 
                                    color: kolors.primary, fontWeight: "bold" 
                                }} 
                            />
                        </Button>
                    </form>

                </Box>

            </Box>

                          
            <input 
                type="file" 
                id='uploadImageInput' 
                name="uploadImageInput" 
                // accept='image/*' 
                accept={artWorkAllowedTypes.toString()}
                onChange={handleImageFileUpload}
                style={{display: "none"}}
            />
        </ModalWrapper>
    )
}
