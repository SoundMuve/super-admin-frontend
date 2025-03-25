import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import CloseIcon from '@mui/icons-material/Close';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015

import TagsComponent from '@/components/account/blog/Tags';
import SlugComponent from '@/components/account/blog/Slug';
import CategoriesComponent from '@/components/account/blog/Categories';
import SeoMetaDataComponent from '@/components/account/blog/SeoMetaData';
import PreviewPostModal from '@/components/account/blog/PreviewPostModal';
import FeaturedImageComponent from '@/components/account/blog/FeaturedImage';

import kolors from '@/constants/kolors';
import { newsletterMuiTextFieldStyle } from '@/util/mui';
import { useBlogHook } from '@/hooks/blog/useBlogHook';
import BackNavigationArrowBtn from '@/components/BackNavigationArrowBtn';
dayjs.extend(localizedFormat);


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

// Debounce utility function
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export default function NewPost() {
    const navigate = useNavigate();
    const {post_id} = useParams();
    
    // const [reactQuillValue, setReactQuillValue] = useState('');
    const [editorPreview, setEditorPreview] = useState(false);

    // const [statusHandler, setStatusHandler] = useState({
    //     editState: false,
    //     temptStatus: ""
    // });

    const [scheduleHandler, setScheduleHandler] = useState({
        editState: false,
        dateValue: "",
        timeValue: "",
    });
        
    const {
        getPostById,
        postDetails,

        apiResponse, // setApiResponse,

        reactQuillValue, setReactQuillValue,
        categories, setCategories,
        tags, setTags,
        featuredImage, setFeaturedImage,
        setImage, image,
        slug, setSlug,
        keywords, setKeywords,
        metaTitle, setMetaTitle,
        metaDescription, setMetaDescription,
        allowComments, setAllowComments,
        status, setStatus,
        scheduledAt, setScheduledAt,
        saveDraft, setSaveDraft,
        
        errors,
        isValid,
        isSubmittingForm,
        blogPostForm,
        onSubmit,
        register,
        trashBlogPost,
        createBlogPost,
    } = useBlogHook();

    useEffect(() => {
        if (post_id && !postDetails) {
            getPostById(post_id);
        }

        if (postDetails && postDetails._id) {
            blogPostForm.setValue(
                "title", postDetails.title,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            setReactQuillValue(postDetails.content);
            blogPostForm.setValue(
                "content", postDetails.content,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            setSlug(postDetails.slug);
            blogPostForm.setValue(
                "slug", postDetails.slug,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            setCategories(postDetails.categories);
            setTags(postDetails.tags);
            setFeaturedImage(postDetails.featuredImage);
            setKeywords(postDetails.keywords);
            setMetaTitle(postDetails.metaTitle);
            setMetaDescription(postDetails.metaDescription);
            setAllowComments(postDetails.allowComments);
            setStatus(postDetails.status);
            setScheduledAt(postDetails.publishedAt);
        }
    }, [postDetails]);

    useEffect(() => {
        blogPostForm.setValue(
            "content", reactQuillValue,
            { shouldDirty: true, shouldTouch: true, shouldValidate: true }
        );
    }, [reactQuillValue]);

    // Function to save the draft
    const processSlug = async (): Promise<void> => {
        const title = blogPostForm.getValues("title");
        // console.log(title);
        
        const newSlug = formatSlug(title || '');
        blogPostForm.setValue(
            "slug", newSlug,
            { shouldDirty: true, shouldTouch: true, shouldValidate: true }
        );

        setSlug(newSlug);
    }

    // Debounced save function
    const debouncedSaveDraft = useCallback(debounce(processSlug, 30000), []); // 60000 => 1 minute debounce

    // Trigger debounced save whenever title or content changes
    useEffect(() => {
        debouncedSaveDraft();
    }, [blogPostForm.getValues("title"), debouncedSaveDraft]);


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
        <Box my={5}>
            <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <BackNavigationArrowBtn />

                <Typography
                    sx={{
                        color: "#7B7979",
                        fontSize: "18px",
                        fontWeight: "500",
                        // lineHeight: "11.101px",
                        // letterSpacing: "-0.463px",
                    }}
                >{ postDetails && postDetails._id ? "Edit" : "Create New" }  Blog Post</Typography>

            </Stack>

            <Box borderRadius="8px" bgcolor="#fff" p={2}>
                <Box>
                    <form noValidate onSubmit={ onSubmit } >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8} md={9} xl={10}>
                                <Box>
                                    <Box>
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
                                            >Title</Typography>

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

                                        <SlugComponent 
                                            setSlug={(available_slug) => {
                                                blogPostForm.setValue(
                                                    "slug", available_slug,
                                                    { shouldDirty: true, shouldTouch: true, shouldValidate: true }
                                                );
                                                setSlug(available_slug);
                                            }}
                                            slug={slug}
                                        />

                                        <Box minHeight={{xs: "420px", sm: "400px"}}>
                                            <Box height="350px">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={reactQuillValue} 
                                                    onChange={setReactQuillValue} 
                                                    placeholder='Type your content here'
                                                    className='ReactQuillIputStyle'
                                                    modules={modules}
                                                />
                                            </Box>
                                        </Box>

                                        {/* { errors.message && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.message?.message }</Box> } */}
                                    </Box>

                                    <Box mt={5}>
                                        <SeoMetaDataComponent
                                            keywords={keywords}
                                            setKeywords={setKeywords}

                                            metaDescription={metaDescription}
                                            setMetaDescription={setMetaDescription}

                                            metaTitle={metaTitle}
                                            setMetaTitle={setMetaTitle}
                                        />
                                    </Box>
                                </Box>
                            </Grid> 
                                                   
                            <Grid item xs={12} sm={4} md={3} xl={2}>
                                <Box>
                                    {/* Publish */}
                                    <Box mb={2}>
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
                                                    {
                                                        !postDetails || postDetails.status == "draft" ? 
                                                            <Button variant="outlined" type="button" size='small'
                                                                disabled={saveDraft}
                                                                onClick={() => {
                                                                    setSaveDraft(true);
                                                                    setTimeout(() => {
                                                                        createBlogPost({
                                                                            slug: slug ? slug : formatSlug(blogPostForm.getValues("title")),
                                                                            title: blogPostForm.getValues("title"),
                                                                            content: reactQuillValue,
                                                                        });
                                                                    }, 500);
                                                                }}
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
                                                        : <></>
                                                    }

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
                                                                textTransform: "capitalize"
                                                            }}
                                                        >{status}</Typography>

                                                        {/* <Button size='small' 
                                                            onClick={() => setStatusHandler({editState: true, temptStatus: ''})}
                                                            sx={{ 
                                                                width: "fit-content",
                                                                textTransform: "none",
                                                                textDecorationLine: "underline",
                                                                display: statusHandler.editState ? "none" : "initial"
                                                            }} 
                                                        >Edit</Button> */}
                                                    </Stack>

                                                    {/* {
                                                        statusHandler.editState &&
                                                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                                            <Select
                                                                id="status"
                                                                size='small'
                                                                defaultValue={status}
                                                                onChange={(e) => {
                                                                    setStatusHandler({...statusHandler, temptStatus: e.target.value})
                                                                }}
                                                            >
                                                                <MenuItem value={"draft"}>Draft</MenuItem>
                                                                <MenuItem value={"schedule"}>Schedule</MenuItem>
                                                            </Select>

                                                            <Button variant="outlined" size='small'
                                                                onClick={() => {
                                                                    setStatus(statusHandler.temptStatus);
                                                                    setStatusHandler({editState: false, temptStatus: ''});
                                                                }}
                                                            >OK</Button>
                        
                                                            <Button size='small'
                                                                onClick={() => {
                                                                    setStatusHandler({...statusHandler, editState: false})
                                                                }}
                                                                sx={{
                                                                    width: "fit-content",
                                                                    textTransform: "none",
                                                                    textDecorationLine: "underline",
                                                                }}
                                                            >Cancel</Button>
                                                        </Stack>
                                                    } */}
                                                    
                                                </Box>

                                                {/* allowComments */}
                                                <Box>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Typography
                                                            sx={{
                                                                color: "grey",
                                                                fontSize: "13px",
                                                                fontWeight: "400",
                                                            }}
                                                        >Allow Comments: </Typography>

                                                        <Switch
                                                            size='small'
                                                            checked={allowComments}
                                                            onChange={(_e, checked) => {
                                                                // console.log(checked);
                                                                setAllowComments(checked);
                                                                // setAllowComments(_e.target.checked);
                                                            }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                            sx={{
                                                                "& .Mui-checked": {
                                                                    color: `${kolors.primary} !important`,
                                                                },
                                                                "& .MuiSwitch-track": {
                                                                    backgroundColor: `${kolors.secondary} !important`
                                                                }
                                                            }}
                                                        />
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
                                                        >{ scheduledAt ? dayjs(scheduledAt).format('llll') : "Immediately"}</Typography>

                                                        <Button size='small'
                                                            onClick={() => setScheduleHandler({ ...scheduleHandler, editState: true })}
                                                            sx={{ 
                                                                width: "fit-content",
                                                                textTransform: "none",
                                                                textDecorationLine: "underline",
                                                                display: scheduleHandler.editState ? "none" : "initial"
                                                            }}
                                                        >Edit</Button>
                                                    </Stack>


                                                    {
                                                        scheduleHandler.editState &&
                                                        <Box>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['DatePicker']}>
                                                                    <DatePicker 
                                                                        label="Date"
                                                                        slotProps={{textField: {size: "small"}}}
                                                                        // value={ selectReleaseDateValue ? dayjs(selectReleaseDateValue) : null }
                                                                        format='DD/MM/YYYY'
                                                                        // onChange={}
                                                                        onChange={(newValue) => {
                                                                            // const value = dayjs(newValue).format('MM/YYYY');
                                                                            const value = dayjs(newValue).format('YYYY/MM/DD');
                                                                            // console.log(value);
            
                                                                            setScheduleHandler({
                                                                                ...scheduleHandler,
                                                                                dateValue: value
                                                                            });
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>

                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['TimePicker']}>
                                                                    <TimePicker label="Time" 
                                                                        slotProps={{textField: {size: "small"}}}
                                                                        // onAccept={}
                                                                        onChange={(newValue) => {
                                                                            // const value = dayjs(newValue).format('MM/YYYY');
                                                                            const value = dayjs(newValue).format('HH:mm:ss');
                                                                            // console.log(value);

                                                                            setScheduleHandler({
                                                                                ...scheduleHandler,
                                                                                timeValue: value,
                                                                            });
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>

                                                            <Stack direction="row" alignItems="center" spacing={1} mt={2}>

                                                                <Button variant="outlined" size='small'
                                                                    onClick={() => {
                                                                        // '2022-04-17T15:30'
                                                                        setScheduledAt(`${scheduleHandler.dateValue}T${scheduleHandler.timeValue}`);

                                                                        setScheduleHandler({
                                                                            editState: false, 
                                                                            dateValue: '',
                                                                            timeValue: '',
                                                                        });
                                                                    }}
                                                                >OK</Button>
                            
                                                                <Button size='small'
                                                                    onClick={() => {
                                                                        setScheduleHandler({
                                                                            editState: false, 
                                                                            dateValue: '',
                                                                            timeValue: '',
                                                                        });
                                                                    }}
                                                                    sx={{
                                                                        width: "fit-content",
                                                                        textTransform: "none",
                                                                        textDecorationLine: "underline",
                                                                    }}
                                                                >Cancel</Button>
                                                            </Stack>
                                                        </Box>
                                                    }

                                                </Box>

                                            </CardContent>

                                            <CardActions sx={{ 
                                                borderTop: "1px solid #c4c4c4", bgcolor: "#f4f4f4",
                                                alignItems: "center", justifyContent: "space-between"
                                            }}>
                                                <Button size="small" color='error'
                                                    type='button'
                                                    sx={{
                                                        textTransform: "none",
                                                        textDecorationLine: "underline"
                                                    }}
                                                    onClick={() => {
                                                        trashBlogPost(postDetails?._id || '',
                                                            () => {
                                                                navigate(-1);
                                                            }
                                                        );
                                                    }}
                                                >Move to Trash</Button>

                                                <Button variant="contained" 
                                                    type="submit" 
                                                    disabled={ !isValid || isSubmittingForm } 
                                                    size='small'
                                                    startIcon={<SendOutlinedIcon sx={{ fontSize: "16px", display: isSubmittingForm ? "none" : "initial" }} />}
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
                                                    <span style={{ display: isSubmittingForm ? "none" : "initial" }}>
                                                        { postDetails && (postDetails.status == "published" || postDetails.status == "scheduled") ? "Update" : "Publish" }
                                                    </span>
                                                    <CircularProgress size={25} sx={{ display: isSubmittingForm ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Box>

                                    {/* Categories */}
                                    <Box mb={2}>
                                        <CategoriesComponent 
                                            selectedCategories={categories}
                                            setSelectedCategories={setCategories}
                                        />
                                    </Box>

                                    {/* Tags */}
                                    <Box mb={2}>
                                        <TagsComponent 
                                            selectedTags={tags}
                                            setSelectedTags={setTags}
                                        />
                                    </Box>

                                    {/* Featured Image */}
                                    <Box>
                                        <FeaturedImageComponent 
                                            featuredImage={featuredImage}
                                            setFeaturedImage={setImage}
                                        />
                                    </Box>
                                </Box>
                            </Grid>                        
                        </Grid>

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

            <PreviewPostModal 
                closePreviewModal={() => setEditorPreview(false)}
                openPreviewModal={editorPreview}
                previewValue={reactQuillValue}
                previewTitle={blogPostForm.getValues("title")}
                previewImage={ image ? URL.createObjectURL(image) : featuredImage }
            />
        </Box>
    )
}
