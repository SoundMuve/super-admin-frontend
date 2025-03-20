import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import featuredImagePlaceHolder from "@/assets/images/featuredImagePlaceHolder.jpg";
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { blogInterface } from '@/typeInterfaces/blog.interface';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015
import { formatedNumber } from '@/util/resources';
import PostMenuComponent from './PostItemMenu';

dayjs.extend(localizedFormat);



interface myProps {
    post: blogInterface;
    getAllBlogPost: () => void;
};

const PostItemComponent: React.FC<myProps> = ({
    post, getAllBlogPost
}) => {

    return (
        <Box
            sx={{
                bgcolor: kolors.secondary,
                borderRadius: "24px",
                p: "16px",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px"
                }}
            >
                <PostMenuComponent 
                    blogPost={post}
                    getBlogPosts={getAllBlogPost}
                />
            </Box>

            {/* <Link to={`/blog/${post.slug}`}> */}
                <Box
                    sx={{
                        border: "1px solid #000000",
                        borderRadius: "16px",
                        overflow: "hidden",
                    }}
                >
                    <img src={post.featuredImage || featuredImagePlaceHolder} alt='blog post image'
                        style={{
                            width: "100%",
                            maxHeight: "280px",
                            objectFit: "cover",
                            objectPosition: "top", // Aligns the image to the top
                            display: "block", // Remove any default inline spacing
                        }}
                    />
                </Box>

                <Link to={`/admin/blog/${post._id}`}>
                    <Box>
                        <Typography variant='subtitle1'
                            sx={{
                                fontFamily: 'Nohemi',
                                fontWeight: "600",
                                fontSize: "20px",
                                // lineHeight: "20px",
                                color: kolors.dark,
                                mt: 1, // mb: 0.5,
                                ...numberOfLinesTypographyStyle(2)
                            }}
                        >{ post.title }</Typography>

                        <Typography variant='body1'
                            sx={{
                                fontFamily: 'Inter',
                                fontWeight: "500",
                                fontSize: "14px",
                                // lineHeight: "16px",
                                color: "#595757",
                                ...numberOfLinesTypographyStyle(5)
                            }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap" mt={2}>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <VisibilityOutlinedIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        color: kolors.dark,
                                    }}
                                >{ formatedNumber(Number(post.views)) }</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        color: kolors.dark,
                                        textTransform: "capitalize"
                                    }}
                                >{ post.status }</Typography>

                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={0.5}
                                sx={{ display: post.comments.length ? "initial" : "none" }}
                            >
                                <ModeCommentOutlinedIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        color: kolors.dark,
                                    }}
                                >{ formatedNumber(post.comments.length) }</Typography>

                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <AccessTimeIcon sx={{ color: "#595757", fontSize: "12px", }} />

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "12px",
                                        color: kolors.dark,
                                    }}
                                >{ dayjs(post.publishedAt).format('lll') }</Typography>
                            </Stack>
                        </Stack>

                    </Box>
                </Link>
            {/* </Link> */}

        </Box>
    );
}

export default PostItemComponent;

