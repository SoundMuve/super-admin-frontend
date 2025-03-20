import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';

import kolors from '@/constants/kolors';
import { useEffect, useState } from 'react';
import PostItemComponent from '@/components/account/blog/PostItem';
import { useBlogHook } from '@/hooks/blog/useBlogHook';
// import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import emptyFolder from "@/assets/images/emptyFolder.png"
import { Link } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';



function BlogPosts() {
    const [searchInputValue, setSearchInputValue] = useState('');
    // const [searchResult, setSearchResult] = useState<any[]>([]);

    const {
        // apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,
        // isSubmitting,
        blogPosts,

        getBlogPosts,
        searchBlogPosts,
    } = useBlogHook();

    useEffect(() => {
        getBlogPosts(currentPageNo, limitNo);
    }, []);
    
    

    const handleSearchInputValue = (searchedWord: string) => {
        setSearchInputValue(searchedWord);
        if (!searchedWord) {
            getBlogPosts(currentPageNo, limitNo);
            return
        };

        // if (!searchedWord || searchedWord.length < 3 ) return;
        // searchBlogPosts(searchedWord, 1, limitNo);
    }

    const WriteNewPostBtn = (
        <Link to="/admin/blog/new">
            <Box
                sx={{
                    borderRadius: "8px",
                    bgcolor: kolors.primary,
                    color: kolors.milk,
                    ":hover": {
                        bgcolor: kolors.tertiary,
                        color: kolors.milk,
                    },
                    padding: "10px 20px",
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <Typography
                    sx={{
                        // color: kolors.milk,
                        fontSize: "14px",
                        fontWeight: "500",
                        // lineHeight: "11.101px",
                        letterSpacing: "-0.463px"
                    }}
                >Write</Typography>

                <EditNoteIcon sx={{ fontSize: "20px" }} />
            </Box>
        </Link>
    );

    
    
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
                    }}
                >Blog Posts</Typography>

                <form noValidate 
                    onSubmit={(e) => {
                        e.preventDefault();
                
                        if (!searchInputValue || searchInputValue.length < 3 ) return;
                        searchBlogPosts(searchInputValue, 1, limitNo);
                    }}
                >
                    <TextField variant="outlined" 
                        fullWidth 
                        id='search'
                        type='text'
                        inputMode='search'
                        placeholder='Search'
                        value={searchInputValue}
                        onChange={(e) => {
                            handleSearchInputValue(e.target.value);
                        }}
                        
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "gray"}} />
                                </InputAdornment>
                            ),
                            endAdornment: searchInputValue && (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleSearchInputValue("")}
                                ><ClearIcon sx={{ color: "gray", fontSize: '16px'}} /></IconButton>
                            ),
                            sx: {
                                borderRadius: "16px",
                                color: 'gray'
                            },
                        }}
                        sx={{
                            maxWidth: "400px",
                            '& label.Mui-focused': {
                                color: 'var(--TextField-brandBorderFocusedColor)',
                            },
                            '& .MuiInputBase-input': { // Target input text
                                color: kolors.dark
                            },
                            '& .MuiInputBase-placeholder': { // Target placeholder text
                                color: 'gray',
                            },
        
                            '& .MuiOutlinedInput-root': {
                                bgcolor: '#fff',
                                border: "1px solid #212121",
                                borderRadius: "48px", // '17.8px',
                                height: '42px',
        
                                '& fieldset': {
                                    // borderColor: darkTheme ? "#c4c4c4" : "#272727", // '#E0E3E7',
                                    border: 'none'
                                },
                                '&:hover fieldset': {
                                    // borderColor: darkTheme ? "#fff" : "#272727", // '#B2BAC2',
                                    border: 'none'
                                },
                                '&.Mui-focused fieldset': {
                                    // borderColor: darkTheme ? '#fff' : '#272727', // '#6F7E8C',
                                    // borderWidth: "2px",
                                    border: 'none'
                                },
                            },
                            zIndex: 9
        
                        }}
                    />
                </form>


                { WriteNewPostBtn }
            </Stack>                



            <Box borderRadius="8px" bgcolor="#fff" p={2} minHeight="70vh">

                <Box>
                    {
                        blogPosts ? 
                            blogPosts.length ?
                                <Box>
                                    <Grid container spacing={2}>
                                        {
                                            blogPosts.map((post, index) => (
                                                <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
                                                    <PostItemComponent 
                                                        post={post}
                                                        getAllBlogPost={() => getBlogPosts()}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>

                                    <Box mt={3}>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                            component="div"
                                            count={totalRecords} // totalRecords
                                            rowsPerPage={limitNo}
                                            page={currentPageNo -1}
                                            onPageChange={(_e, page)=> {
                                                // console.log(page);
                        
                                                const newPage = page + 1;
                                                getBlogPosts(newPage, limitNo);
                                            }}
                                            onRowsPerPageChange={(e) => {
                                                const value = e.target.value;
                                                // console.log(value);
                        
                                                setLimitNo(Number(value));
                                                getBlogPosts(1, limitNo);
                                            }}
                                        />
                                    </Box>
                                </Box>
                            : <Box my={3}> 
                                <Stack alignItems="center" justifyContent="center" height="60vh">
                                    <Box mb={2}>
                                        <img src={emptyFolder} alt='empty image' 
                                            style={{ 
                                                maxWidth: 200, 
                                                maxHeight: 200,
                                                objectFit: "contain"
                                            }} 
                                        />
                                    </Box>

                                    <Typography variant='h3'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            // lineHeight: "20px",
                                            color: kolors.dark,
                                            textAlign: "center"
                                        }}
                                    >No blogs posted yet</Typography>

                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "600",
                                            fontSize: "15px",
                                            lineHeight: "15px",
                                            color: "#ADACAF",
                                            textAlign: "center"
                                        }}
                                    >Click the button below to begin your blog</Typography>

                                    <Box my={2}> { WriteNewPostBtn } </Box>
                                </Stack>
                            </Box>
                        : <LoadingDataComponent />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default BlogPosts;