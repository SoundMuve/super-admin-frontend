import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import CloseIcon from '@mui/icons-material/Close';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import kolors from '@/constants/kolors';


interface myProps {
    editorPreview: boolean
    setEditorPreview: (state: boolean) => void;

    isSubmittingForm: boolean, 
    isValid: boolean
};

const PublishComponent: React.FC<myProps> = ({
    isSubmittingForm, isValid, editorPreview, setEditorPreview
}) => {

    
    return ( 
        <Card variant="outlined">
            <CardHeader
                title={
                    <Typography variant='subtitle1'
                        sx={{
                            color: kolors.dark,
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "11.101px",
                            // letterSpacing: "-0.463px",
                        }}
                    >Publish</Typography>
                }
                // subheader="September 14, 2016"
                sx={{
                    borderBottom: "1px solid #c4c4c4"
                }}
            />

            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
                    <Button variant="outlined" type="button" size='small'
                        onClick={() => setEditorPreview(true)}
                        sx={{ 
                            color: kolors.dark,
                            width: "fit-content",
                            borderColor: kolors.tertiary,

                            "&:hover": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            "&:active": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            "&:focus": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            // borderRadius: "12px",
                            // my: 2, 
                            // py: 1.5
                            textTransform: "none"
                        }}
                    >Save Draft</Button>

                    <Button variant="outlined" type="button" size='small'
                        onClick={() => setEditorPreview(true)}
                        sx={{ 
                            borderColor: kolors.tertiary,
                            color: kolors.dark,
                            width: "fit-content",

                            "&:hover": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            "&:active": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            "&:focus": {
                                borderColor: kolors.primary,
                                color: kolors.primary,
                            },
                            // borderRadius: "12px",
                            // my: 2, 
                            // py: 1.5
                            textTransform: "none"
                        }}
                    >Preview</Button>
                </Stack>

                {/* Status */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            sx={{
                                color: "grey",
                                fontSize: "13px",
                                fontWeight: "400",
                            }}
                        >Status: </Typography>

                        <Typography
                            sx={{
                                color: "grey",
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                        >Draft</Typography>

                        <Button size='small' 
                            sx={{ 
                                width: "fit-content",
                                textTransform: "none",
                                textDecorationLine: "underline",
                            }} 
                        >Edit</Button>
                    </Stack>

                    
                </Box>
                
                {/* Publish Scheduling */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            sx={{
                                color: "grey",
                                fontSize: "13px",
                                fontWeight: "400",
                            }}
                        >Publish: </Typography>

                        <Typography
                            sx={{
                                color: "grey",
                                fontSize: "13px",
                                fontWeight: "600",
                            }}
                        >immediately</Typography>

                        <Button size='small'
                            sx={{ 
                                width: "fit-content",
                                textTransform: "none",
                                textDecorationLine: "underline",
                            }}
                        >Edit</Button>
                    </Stack>

                </Box>

            </CardContent>

            <CardActions sx={{ 
                borderTop: "1px solid #c4c4c4", bgcolor: "#f4f4f4",
                alignItems: "center", justifyContent: "space-between"
            }}>
                <Button size="small" color='error'
                    sx={{
                        textTransform: "none",
                        textDecorationLine: "underline"
                    }}
                >Move to Trash</Button>

                <Button variant="contained" 
                    type="submit" 
                    disabled={ !isValid || isSubmittingForm } 
                    size='small'
                    startIcon={<SendOutlinedIcon sx={{ fontSize: "16px" }} />}
                    sx={{ 
                        bgcolor: kolors.primary,
                        color: kolors.milk,
                        width: "fit-content",

                        // "&.Mui-disabled": {
                        //     background: "#c4c4c4",
                        //     color: "#797979"
                        // },
                        "&:hover": {
                            bgcolor: kolors.tertiary,
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
                        // borderRadius: "12px",
                        // my: 2, 
                        // py: 1.5
                        textTransform: "none"
                    }}
                >
                    <span style={{ display: isSubmittingForm ? "none" : "initial" }}>Publish</span>
                    <CircularProgress size={25} sx={{ display: isSubmittingForm ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                </Button>
            </CardActions>
        </Card>         
    );
}

export default PublishComponent;

