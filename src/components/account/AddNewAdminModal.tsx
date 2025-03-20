import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import SyncIcon from '@mui/icons-material/Sync';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import kolors from '@/constants/kolors';
import ModalWrapper from '../ModalWrapper';
import { useAddNewAdmin } from '@/hooks/admins/useAddNewAdmin';
import { 
    authMuiTextFieldStyle, paymentTextFieldStyle, submitBtnStyle
} from '@/util/mui';
import { userInterface } from '@/typeInterfaces/users.interface';
import { generatePassword } from '@/util/resources';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


interface _Props {
    openAddNewAdminModal: boolean,
    closeAddNewAdminModal: (state: boolean) => void,

    // activities: activityInterface,
}

export const AddNewAdminModal: React.FC<_Props> = ({
    openAddNewAdminModal, closeAddNewAdminModal
}) => {
    const {
        apiResponse, setApiResponse,
        enteredEmail,

        emailUserData, setEmailUserData,
        // openNewAdminPreviewPage, setOpenNewAdminPreviewPage,
        newAdminCurrentPage, setNewAdminCurrentPage,

        // emailFormState,
        emailForm, submitEmailForm,

        newAdminPreviewForm, submitNewAdminPreviewForm,
    } = useAddNewAdmin();

    useEffect(() => {
        setApiResponse({
            display: false,
            status: true,
            message: '',
        });
    }, [newAdminCurrentPage]);

    useEffect(() => {
        if (openAddNewAdminModal) {
            // setOpenNewAdminPreviewPage(false);
            setNewAdminCurrentPage("email");

            setEmailUserData(undefined);

        } else {
            emailForm.reset();
            newAdminPreviewForm.reset();
            
            setApiResponse({
                display: false,
                status: true,
                message: '',
            });
        }
    }, [openAddNewAdminModal]);
    


    return (
        <ModalWrapper 
            closeModal={() => closeAddNewAdminModal(false) } 
            openModal={openAddNewAdminModal} 
        >
            <Box>
                <Typography sx={{
                    fontWeight: "900",
                    fontSize: "24px",
                    // lineHeight: "16px",
                    letterSpacing: "-0.34px",
                    textAlign: "center",
                    mb: 1,
                    display: newAdminCurrentPage == "success" ? "none" : "inherit"
                }}> Add New Admin </Typography>

                {
                    newAdminCurrentPage == "email" ? 
                        <UserEmailComponent 
                            // setUserData={setNewAdminUserData} 
                            apiResponse={apiResponse}
                            emailForm={emailForm}
                            submitEmailForm={submitEmailForm}
                        />
                    : newAdminCurrentPage == "preview" ? 
                        <NewAdminPreviewComponent 
                            emailUserData={emailUserData}
                            apiResponse={apiResponse}
                            newAdminPreviewForm={newAdminPreviewForm}
                            submitNewAdminPreviewForm={submitNewAdminPreviewForm}
                        />
                    : newAdminCurrentPage == "success" ? 
                        <SuccessComponent
                            newAdminUserData={emailUserData} 
                            email={enteredEmail}
                        />
                    : <></>
                }

            </Box>
        </ModalWrapper>
    )
}



interface email_Props {
    // setUserData: (userData: userInterface) => void,

    apiResponse: {
        display: boolean;
        status: boolean;
        message: string;
    }
    
    emailForm: UseFormReturn<{
        email: string;
    }, any, undefined>,
    
    submitEmailForm: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const UserEmailComponent: React.FC<email_Props> = ({ 
    // setUserData,
    apiResponse, emailForm, submitEmailForm
}) => {

    
    return (
        <Box>
            <form noValidate onSubmit={ submitEmailForm } >
                <Box>
                    <Typography sx={{
                        fontWeight: "700",
                        fontSize: "14px",
                        lineHeight: "16px",
                        letterSpacing: "-0.34px",
                        textAlign: "left",
                        mb: 1
                    }}> Email Address </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='email'
                        type='email'
                        inputMode='email'
                        defaultValue=""
                        size='small'
                        
                        sx={paymentTextFieldStyle}
                        
                        error={ emailForm.formState.errors.email ? true : false }
                        { ...emailForm.register('email') }
                    />

                    { emailForm.formState.errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ emailForm.formState.errors.email?.message }</Box> }
                </Box>

                <Typography variant='body2'
                    sx={{
                        color: "#AEAEAE",
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "12px",
                        letterSpacing: "-0.463px",
                        my: 2
                    }}
                >
                    <b>Note: </b>
                    Adding an new admin means they have 
                    access to every control
                </Typography>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', my: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }

                <Box 
                    sx={{ 
                        mt: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Button variant="contained" size='small'
                        type="submit"
                        disabled={ !emailForm.formState.isValid || emailForm.formState.isSubmitting } 
                        sx={{
                            ...submitBtnStyle,
                            borderRadius: "10px",
                            p: "10px 15px",
                        }}
                    >
                        <span style={{ display: emailForm.formState.isSubmitting ? "none" : "initial" }}>Next</span>
                        <CircularProgress size={25} 
                            sx={{ 
                                display: emailForm.formState.isSubmitting ? "initial" : "none", 
                                color: kolors.primary,
                                fontWeight: "bold" 
                            }} 
                        />
                    </Button>
                </Box>

            </form>
        </Box>
    );
}


interface newAdminPreview_Props {
    emailUserData: userInterface | undefined,

    apiResponse: {
        display: boolean;
        status: boolean;
        message: string;
    },

    newAdminPreviewForm: UseFormReturn<{
        email: string;
        firstName: string;
        lastName: string;
        // password: string;
        password?: string | undefined;
        role: string;
    }, any, undefined>
    
    submitNewAdminPreviewForm: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const NewAdminPreviewComponent: React.FC<newAdminPreview_Props> = ({ 
    emailUserData, apiResponse, newAdminPreviewForm, submitNewAdminPreviewForm
}) => {
    const errors = newAdminPreviewForm.formState.errors;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        if (emailUserData?.password) return;
        setShowPassword((show) => !show);
    };

    const [confirmCheckBox, setConfirmCheckBox] = useState(false);

    // const userRoles = ['user', 'admin', 'super admin', 'moderator', 'editor', 'support'];
    const userRoles = ['user', 'admin', 'editor'];
    
    return (
        <Box>
            <form noValidate onSubmit={ submitNewAdminPreviewForm }
                style={{ maxWidth: "549px", width: "100%", alignSelf: "center" }}
            >
                <Box sx={{ 
                    width: "100%",
                    maxWidth: {xs: "470px", md: "100%"},
                    textAlign: "center"
                }}>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        flexWrap: "nowrap",
                        textAlign: "left",
                        mt: "35px"
                    }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <TextField 
                                variant="standard" 
                                fullWidth 
                                id='firstName'
                                type='text'
                                label=''
                                placeholder='First Name'
                                inputMode='text'
                                // defaultValue={emailUserData?.firstName || ''}
                                InputLabelProps={{
                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                }}
                                sx={{
                                    ...authMuiTextFieldStyle
                                }}
                                InputProps={{
                                    sx: {
                                        borderRadius: "16px",
                                    },
                                    readOnly: emailUserData?.firstName ? true : false
                                }}
                                
                                error={ errors.firstName ? true : false }
                                { ...newAdminPreviewForm.register('firstName') }
                            />
                            { errors.firstName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.firstName?.message }</Box> }

                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <TextField 
                                variant="standard" 
                                fullWidth 
                                id='lastName'
                                type='text'
                                label=''
                                placeholder='Last Name'
                                inputMode='text'
                                // defaultValue={ emailUserData?.lastName || "" }
                                InputLabelProps={{
                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                }}
                                sx={{
                                    ...authMuiTextFieldStyle
                                }}
                                InputProps={{
                                    sx: {
                                        borderRadius: "16px",
                                    },
                                    readOnly: emailUserData?.lastName ? true : false
                                }}
                                
                                error={ errors.lastName ? true : false }
                                { ...newAdminPreviewForm.register('lastName') }
                            />
                            { errors.lastName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lastName?.message }</Box> }

                        </Box>
                    </Box>

                    <Box sx={{ mt: "35px" }}>
                        <TextField variant="standard" 
                            fullWidth 
                            id='email'
                            type='email'
                            label=''
                            placeholder='Email Address'
                            inputMode='email'
                            // defaultValue={emailUserData?.email || ''}
                            InputLabelProps={{
                                style: { color: '#c1c1c1', fontWeight: "400" },
                            }}
                            InputProps={{
                                sx: {
                                    borderRadius: "16px",
                                },
                                readOnly: emailUserData?.email ? true : false
                            }}
                            
                            error={ errors.email ? true : false }
                            { ...newAdminPreviewForm.register('email') }
                        />
                        { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                    </Box>

                    <Box sx={{ mt: "35px" }}>
                        {
                            !emailUserData?.password ? 
                                <Stack direction="row" alignItems="center" width="fit-content"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        const newPassword = generatePassword();
                                        newAdminPreviewForm.setValue(
                                            "password", newPassword,
                                            { shouldDirty: true, shouldTouch: true, shouldValidate: true }
                                        )
                                    }}
                                >
                                    <SyncIcon sx={{ color: kolors.primary, fontSize: "16px" }} />
                                    <Typography sx={{ color: kolors.tertiary }}>Generate password</Typography>
                                </Stack>
                            : <></>
                        }

                        <TextField variant="standard"
                            id='password'
                            fullWidth 
                            type={showPassword ? "text" : 'password' }
                            inputMode='text'
                            placeholder='Password'
                            
                            InputProps={{
                                endAdornment: 
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{color: "gray"}}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>,
                                sx: {
                                    borderRadius: "16px",
                                },
                                readOnly: true
                            }}
                            
                            error={ errors.password ? true : false }
                            { ...newAdminPreviewForm.register('password') }
                        />
                        { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                    </Box>

                    <Select
                        id="userRole"
                        fullWidth
                        defaultValue={emailUserData?.role || "role"}
                        // value={emailUserData?.role || "role"}
                        size='small'
                        sx={{
                            // color: getStatusColor(releaseDetails.status, 'text'),
                            borderRadius: "6px",
                            // bgcolor: getStatusColor(releaseDetails.status, "bg"),
                            // border: "none",
                            borderColor: kolors.tertiary,
                            textAlign: "start",
                            my: 2,
                            
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: kolors.primary,
                                // border: "none",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: kolors.tertiary, // 'rgba(228, 219, 233, 0.25)',
                                // border: "none",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--TextField-brandBorderHoverColor)',
                                // border: "none",
                            },
                            '.MuiSvgIcon-root ': {
                                fill: kolors.milk,
                            }
                        }}

                        { ...newAdminPreviewForm.register('role') }
                    >
                        <MenuItem value="role" disabled>
                            Select user role
                        </MenuItem>

                        {
                            userRoles.map((roles, index) => (
                                <MenuItem key={index} value={roles}
                                    sx={{ textTransform: "capitalize" }}
                                >{roles}</MenuItem>
                            ))
                        }
                        {/* <MenuItem value="user">
                            User
                        </MenuItem>
                        <MenuItem value="admin">
                            Admin
                        </MenuItem> */}
                    </Select>


                    <FormGroup>
                        <FormControlLabel required label="Please Confirm"
                            control={<Checkbox 
                                checked={confirmCheckBox}
                                sx={{
                                    color: "#D9D9D9",
                                    '&.Mui-checked': {
                                        color: kolors.primary,
                                    },
                                }}
                                onChange={(e) => {
                                    // newAdminPreviewForm.control._updateValid(true);
                                    if (emailUserData?.password) {
                                        newAdminPreviewForm.setValue(
                                            "password", emailUserData?.password,
                                            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                        );
                                    }
                                    setConfirmCheckBox(e.target.checked);

                                }}
                            />}  
                        />
                    </FormGroup>


                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', my: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }


                    <Box 
                        sx={{ 
                            mt: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button variant="contained" size='small'
                            type="submit"
                            disabled={ 
                                !newAdminPreviewForm.formState.isValid || 
                                !confirmCheckBox ||
                                newAdminPreviewForm.formState.isSubmitting
                            } 
                            sx={{
                                ...submitBtnStyle,
                                borderRadius: "10px",
                                p: "10px 15px",
                            }}
                        >
                            <span style={{ display: newAdminPreviewForm.formState.isSubmitting ? "none" : "initial" }}>Submit</span>
                            <CircularProgress size={25} 
                                sx={{ 
                                    display: newAdminPreviewForm.formState.isSubmitting ? "initial" : "none", 
                                    color: kolors.primary,
                                    fontWeight: "bold" 
                                }} 
                            />
                        </Button>
                    </Box>

                </Box>
            </form>
        </Box>
    );
}


interface success_Props {
    newAdminUserData: userInterface | undefined,
    email: string
}

const SuccessComponent: React.FC<success_Props> = ({ 
    newAdminUserData, email
}) => {
    
    return (
        <Box>
            <Stack alignItems="center" spacing="30px">
                <CheckCircleIcon 
                    sx={{ 
                        fontSize: "100px", 
                        color: kolors.primary 
                    }} 
                />

                <Stack alignItems="center" spacing="5px">
                    <Typography variant='h3'
                        sx={{
                            color: "#555",
                            fontSize: "20px",
                            fontWeight: "700",
                            // lineHeight: "10.711px",
                            letterSpacing: "-0.463px"
                        }}
                    >Invitation has been  sent to</Typography>

                    <Typography
                        sx={{
                            color: "#555",
                            fontSize: "14px",
                            fontWeight: "400",
                            // lineHeight: "5.356px",
                            letterSpacing: "-0.231px"
                        }}
                    >{ newAdminUserData?.email || email }</Typography>
                </Stack>

            </Stack>
        </Box>
    );
}
