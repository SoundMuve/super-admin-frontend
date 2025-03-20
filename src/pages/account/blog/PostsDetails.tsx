import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import kolors from '@/constants/kolors';

import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBlogHook } from '@/hooks/blog/useBlogHook';
import Stack from '@mui/material/Stack';
import { formatedNumber } from '@/util/resources';
import dayjs from 'dayjs';
import LoadingDataComponent from '@/components/LoadingData';
import Button from '@mui/material/Button';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import BackNavigationArrowBtn from '@/components/BackNavigationArrowBtn';

function PostsDetails() {
    const navigate = useNavigate();
    const {post_id} = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [dialogData, setDialogData] = useState({
        action: () => {},
        state: false,
        title: '',
        description: '',
    });
    
    const {
        getPostById,
        postDetails,
        // apiResponse, // setApiResponse,
        deleteBlogPost,

    } = useBlogHook();
    
    useEffect(() => {
        if (post_id) {
            getPostById(post_id);
        } else {
            navigate(-1);
        }
    }, [post_id]);

    
    return (
        <Box my={5}>

            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <BackNavigationArrowBtn />

            </Stack>

            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                {
                    postDetails ? 
                        <Box>
                            <Typography variant='h2'
                                sx={{
                                    fontFamily: 'Nohemi',
                                    fontWeight: {xs: "600", md: "700"},
                                    fontSize: {xs: "20px", sm: "30px", md: "40px"},
                                    // lineHeight: "20px",
                                    textAlign: "center",
                                    color: kolors.dark,
                                    mb: 1,
                                }}
                            >{ postDetails.title }</Typography>

                            <Box
                                sx={{
                                    bgcolor: kolors.secondary,
                                    borderRadius: "24px",
                                    p: "16px",
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "1px solid #000000",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        maxHeight: {xs: "235px", md: "300px"},
                                    }}
                                >
                                    <img src={postDetails.featuredImage || featuredImagePlaceHolder} 
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

                                <Box>
                                    {/* <Typography variant='subtitle1'
                                        sx={{
                                            fontFamily: 'Nohemi',
                                            fontWeight: "600",
                                            fontSize: "20px",
                                            // lineHeight: "20px",
                                            color: kolors.dark,
                                            mt: 1, mb: 0.5
                                        }}
                                    >{ postDetails.title }</Typography> */}

                                    <Typography variant='body1'
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            // lineHeight: "16px",
                                            color: kolors.dark,
                                        }}
                                        dangerouslySetInnerHTML={{ __html: postDetails.content }}
                                    />
                                </Box>
                            </Box>


                            <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap" my={2}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: kolors.dark,
                                            textTransform: "capitalize"
                                        }}
                                    >{ postDetails.status }</Typography>

                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <PersonOutlinedIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: kolors.dark,
                                        }}
                                    >{ postDetails?.author_name }</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <AccessTimeIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: kolors.dark,
                                        }}
                                    >{ dayjs(postDetails.publishedAt).format('lll') }</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={0.5}
                                    sx={{ display: postDetails.comments.length ? "initial" : "none" }}
                                >
                                    <ModeCommentOutlinedIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: kolors.dark,
                                        }}
                                    >{ formatedNumber(postDetails.comments.length) }</Typography>

                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <VisibilityOutlinedIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "12px",
                                            color: kolors.dark,
                                        }}
                                    >{ formatedNumber(Number(postDetails.views)) }</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center" justifyContent="center"
                                gap={2} flexWrap="wrap" mt={2}
                            >
                                <Button variant="outlined" size='small'
                                    onClick={() => navigate(`/admin/blog/edit/${postDetails._id}`)} 
                                >Edit</Button>

                                <Button variant="outlined" size='small' color='error' 
                                    disabled={isLoading}
                                    onClick={() => {
                                        setDialogData({
                                            action: async () => {
                                                setIsLoading(true);
                                                setDialogData({
                                                    action: () => {},
                                                    state: false,
                                                    title: '',
                                                    description: '',
                                                });
                                
                                                await deleteBlogPost(
                                                    `${postDetails._id}`,
                                                    () => {
                                                        // setIsLoading(false);
                                                    }    
                                                );
                                                setIsLoading(false);
                                            },
                                            state: true,
                                            title: 'Confirm',
                                            description: 'Are you sure, you want to proceed with deleting this blog post?',
                                        });
                                  
                                    }}
                                >Delete</Button>

                            </Stack>
                            
                        </Box>
                    : <LoadingDataComponent />
                }
            </Box>



            <ConfirmationDialog 
                actionYes={() => {
                    dialogData.action();
                }}
                isSubmitting={isLoading}
                openDialog={dialogData.state}
                setOpenDialog={() => {
                    setDialogData({
                        action: () => {},
                        state: false,
                        title: '',
                        description: '',
                    });
                    setIsLoading(false);
                }}
                title={dialogData.title}
                description={dialogData.description}
            />
        </Box>
    )
}

export default PostsDetails;