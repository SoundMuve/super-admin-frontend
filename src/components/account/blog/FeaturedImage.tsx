import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import kolors from '@/constants/kolors';
import { convertToBase64 } from '@/util/resources';
import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";


interface myProps {
    featuredImage: string;
    setFeaturedImage: (imageFile: File | undefined) => void;
};

const FeaturedImageComponent = React.memo<myProps>(({ 
    featuredImage, setFeaturedImage
}) => {
    const [imagePreview, setImagePreview] = React.useState('');

    const [openDescriptionTooltip, setOpenDescriptionTooltip] = React.useState(false);

    React.useEffect(() => {
        if (featuredImage) setImagePreview(featuredImage);
    }, [featuredImage]);
    
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 

        // validate File Size
        const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
        if (file.size > maxSizeInBytes) {
            alert("File size must be smaller than 1MB.");
            return false;
        }

        setFeaturedImage(file);

        const base64 = await convertToBase64(file);
        setImagePreview(base64.result);
    
        e.target.value = "";
    }

    
    return (
        <Box>
            <Card variant="outlined">
                <CardHeader
                    title={
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing="10px">
                            <Typography variant='subtitle1'
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    // lineHeight: "11.101px",
                                    // letterSpacing: "-0.463px",
                                }}
                            >Featured Image</Typography>
   
                            <Box>
                                <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)}>
                                    <div>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            placement='left'
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
                                                    Featured image must meet all of these requirements.
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

                                                    {/* <ListItem disablePadding>
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
                                                                </Box>} 
                                                            />
                                                        </ListItemButton>
                                                    </ListItem> */}

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
                        </Stack>
                    }
                    // subheader="September 14, 2016"
                    sx={{
                        borderBottom: "1px solid #c4c4c4"
                    }}
                />

                <CardContent>
                    <Box>

                        <Box>
                            <img 
                                src={ imagePreview || featuredImagePlaceHolder } 
                                alt='featured image'
                                style={{
                                    width: "100%",
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    document.getElementById("featuredImage")?.click();
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                color: "grey",
                                fontSize: "12px",
                                fontWeight: "400",
                                // lineHeight: "11.101px",
                                // letterSpacing: "-0.463px",
                                mb: 2
                            }}
                        >Click the image to set or update featured image</Typography>


                        <Button size="small" color='error'
                            onClick={() => {
                                setFeaturedImage(undefined);
                                setImagePreview('');
                            }}
                            sx={{
                                textTransform: "none",
                                textDecorationLine: "underline",
                                display: imagePreview ? "initial" : "none"
                            }}
                        >Remove featured image</Button>
                    </Box>
                </CardContent>
            </Card>            

            <input 
                type="file" 
                id='featuredImage' 
                name="featuredImage" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    );
});

export default FeaturedImageComponent;

