import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useBlogHook } from '@/hooks/blog/useBlogHook';
import { Link } from 'react-router-dom';


interface myProps {
    slug: string;
    setSlug: (slug: string) => void;
};

const SlugComponent: React.FC<myProps> = ({
    slug, setSlug
}) => {
    const [editSlug, setEditSlug] = React.useState(false);
    const [slugInput, setSlugInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        apiResponse, // setApiResponse,
        checkBlogPostSlugAvailability,
    } = useBlogHook();

    function formatSlug(input: string) {
        if (!input) return ''; // Return an empty string if input is null or undefined
      
        // Convert to lowercase
        let slug = input.toLowerCase();
      
        // Replace spaces and special characters with hyphens
        slug = slug.replace(/\s+/g, '-') // Replace spaces with hyphens
                   .replace(/[^\w\-]+/g, ''); // Remove non-alphanumeric characters (except hyphens)
      
        // Trim leading and trailing hyphens
        slug = slug.replace(/^-+/, '') // Remove leading hyphens
                   .replace(/-+$/, ''); // Remove trailing hyphens
      
        return slug;
    }

    
    return (
        <Box>
            {
                slug && 
                <Box mb={2}>
                    <Stack direction="row" alignItems="center" >
                        <Typography variant='subtitle1'
                            sx={{
                                color: "grey",
                                fontSize: "13px",
                                fontWeight: "500",
                            }}
                        >Permalink: &nbsp;</Typography>

                        {
                            editSlug ? <>
                                <Typography variant='subtitle2'
                                    sx={{
                                        color: "grey",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                    }}
                                > https://soundmuve.com/blog/</Typography>

                                <TextField 
                                    variant="outlined" 
                                    // fullWidth 
                                    placeholder=''
                                    size='small'
                                    value={slugInput}
                                    onChange={(e) => setSlugInput(e.target.value)}
                                    // sx={{
                                    //     ...newsletterMuiTextFieldStyle
                                    // }}
                                    error={ !apiResponse.status }
                                    // { ...register('slug') }
                                />

                                <Stack direction="row" alignItems="center" spacing={1} mx={1}>
                                    <Button variant="outlined" size='small'
                                        onClick={() => {
                                            setIsLoading(true);
                                            const newSlug = formatSlug(slug);

                                            checkBlogPostSlugAvailability(
                                                newSlug,
                                                (responds) => {
                                                    console.log(responds);
                                                    setSlug(responds.slug);
                                                    // {available: boolean, slug: string}

                                                    setIsLoading(false);

                                                    setEditSlug(false);
                                                    setSlugInput('');
                                                }
                                            );
                                        }}
                                    >
                                        { isLoading ? <CircularProgress sx={{ fontSize: "9px" }} /> : "OK" }
                                    </Button>

                                    <Button size='small'
                                        onClick={() => {
                                            setEditSlug(false);
                                            setSlugInput('');
                                        }}
                                        sx={{
                                            width: "fit-content",
                                            textTransform: "none",
                                            textDecorationLine: "underline",
                                        }}
                                    >Cancel</Button>
                                </Stack>
                            </> : 
                            <Stack direction="row" alignItems="center" spacing="5px">
                                <Typography variant='subtitle2'
                                    sx={{
                                        color: "grey",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    <Link to={`https://soundmuve.com/blog/${slug}`}
                                    >https://soundmuve.com/blog/{slug}</Link>
                                </Typography>

                                <Button size='small'
                                    onClick={() => {
                                        setEditSlug(true);
                                        setSlugInput(slug);
                                    }}
                                    sx={{
                                        width: "fit-content",
                                        textTransform: "none",
                                        textDecorationLine: "underline",
                                    }}
                                >Edit</Button>
                            </Stack>
                        }

                    </Stack>

                    { apiResponse.display && <Box sx={{fontSize: 13, color: apiResponse.status ? "green" : "red", textAlign: "left"}}>{ apiResponse.message }</Box> }
                </Box>
            }
        </Box>
    );
}

export default SlugComponent;
