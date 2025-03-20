import { useCallback, useState } from "react";

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSettingStore } from "@/state/settingStore";

import { blogInterface, commentInterface } from "@/typeInterfaces/blog.interface";
import dayjs from 'dayjs';
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    title: yup.string().trim().required().label("Title"),
    content: yup.string().trim().required().label("Content"),
    slug: yup.string().trim().required().label("Content"),
});

export function useBlogHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    // const userData = useUserStore((state) => state.userData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [blogPosts, setBlogPosts] = useState<blogInterface[]>();
    const [postDetails, setPostDetails] = useState<blogInterface>();
    const [postComments, setPostComments] = useState<commentInterface[]>();

    const [post_id, setPost_id] = useState('');

    const [reactQuillValue, setReactQuillValue] = useState('');
    // const [editorPreview, setEditorPreview] = useState(false);
    const [categories, setCategories] = useState(["All"]);
    const [tags, setTags] = useState<string[]>([]);
    const [featuredImage, setFeaturedImage] = useState('');
    const [image, setImage] = useState<File>();
    const [slug, setSlug] = useState('');
    
    const [keywords, setKeywords] = useState<string[]>([]);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [allowComments, setAllowComments] = useState(false);
    const [status, setStatus] = useState('draft');
    const [scheduledAt, setScheduledAt] = useState('');


    const blogPostForm = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });
    
    const getBlogPosts = useCallback(async (pageNo = currentPageNo, limit = limitNo) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog/admin`, {
                params: {
                    page: pageNo,
                    limit: limit,
                    // userType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setBlogPosts(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const getPostById = useCallback(async (post_id: string, successFunc = (_resData: any) => {}) => {
        try {
            const response = (await apiClient.get(`/blog/admin/${post_id}`)).data;
            // console.log(response);

            if (response.status) {
                setPostDetails(response.result);
                successFunc(response.result);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);

    const searchBlogPosts = useCallback(async (searchWord: string, pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog/search`, {
                params: {
                    searchWord: searchWord,
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setBlogPosts(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const getBlogPostsCommet = useCallback(async (
        post_id: string, pageNo: number, limitNo: number
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/blog/post/comment`, 
                {
                    params: { 
                        post_id, 
                        page: pageNo,
                        limit: limitNo 
                    },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                setPostComments(response.result.posts);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const editBlogPostsCommet = useCallback(async (
        post_id: string, content: string, author_name: string, author_email: string
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.patch(`/blog/post/comment`, 
                { post_id, content, author_name, author_email }
            )).data;
            // console.log(response);

            if (response.status) {
                // setBlogPosts(response.result.posts);

                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);
            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const deleteBlogPostsCommet = useCallback(async (post_id: string ) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.delete(`/blog/post/comment`, 
                {
                    params: { post_id },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                // setBlogPosts(response.result.posts);

                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);
            }
            
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const checkBlogPostSlugAvailability = useCallback(async (
        post_slug: string, successFunc = (_resData: any) => {}
    ) => {
        try {
            const response = (await apiClient.get(`/blog/post/check-slug`, 
                {
                    params: { post_slug },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                // setSlugAvailability(response.result);
                successFunc(response.result);
            }
            
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);

      
    const createBlogPost = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const data2db = new FormData();
        if (post_id) data2db.append('post_id', post_id);
        data2db.append('title', formData.title);
        data2db.append('slug', slug || formData.slug);
        data2db.append('content', reactQuillValue || formData.content);
        data2db.append('categories', JSON.stringify(categories));
        data2db.append('tags', JSON.stringify(tags));
        
        data2db.append('metaTitle', metaTitle || '');
        data2db.append('metaDescription', metaDescription || '');
        data2db.append('keywords', JSON.stringify(keywords));
        data2db.append('allowComments', JSON.stringify(allowComments));
        
        if (scheduledAt) {
            data2db.append('publishedAt', scheduledAt);
            data2db.append('status', "scheduled");
        } else {
            data2db.append('publishedAt', dayjs().format());
            data2db.append('status', "published");
        }

        if (image) data2db.append('tempt_image', image);


        try {
            let response: any;
            if (post_id) {
                response = (await apiClient.patch(`/blog/update-post/${post_id}`, 
                    data2db, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )).data;
            } else {
                response = (await apiClient.post(`/blog/create-new-post`, 
                    data2db, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )).data;
            }
            // console.log(response);

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

            if (response.status) {
                setPost_id(response.result._id);

                // _setContactDetails(response.result);

                // On success run the get blog post by id

                // setReactQuillValue("");
                // blogPostForm.reset();
                return true;
            }

            return false;
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            return false;
        }
    }
      
    const deleteBlogPost = useCallback(async (post_id: string, successFunc = (_resData: any) => {}) => {
        try {
            const response = (await apiClient.get(`/blog/${post_id}`)).data;
            // console.log(response);

            if (response.status) {
                successFunc(response.result);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);
      
    const trashBlogPost = useCallback(async (post_id: string, successFunc = (_resData: any) => {}) => {
        try {
            const response = (await apiClient.patch(`/blog/post/trash/${post_id}`, {} )).data;
            // console.log(response);

            if (response.status) {
                successFunc(response.result);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);



    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        post_id, setPost_id,
        reactQuillValue, setReactQuillValue,
        // editorPreview, setEditorPreview,
        categories, setCategories,
        tags, setTags,
        featuredImage, setFeaturedImage,
        image, setImage,
        slug, setSlug,
        keywords, setKeywords,
        metaTitle, setMetaTitle,
        metaDescription, setMetaDescription,
        allowComments, setAllowComments,
        status, setStatus,
        scheduledAt, setScheduledAt,


        // start of form controls
        errors: blogPostForm.formState.errors,
        isValid: blogPostForm.formState.isValid,
        isSubmittingForm: blogPostForm.formState.isSubmitting,
        blogPostForm,
        onSubmit: blogPostForm.handleSubmit(createBlogPost),
        register: blogPostForm.register,
        // end of form controls

        blogPosts,
        postDetails,
        postComments,
        // slugAvailability,

        getBlogPosts,
        getPostById,
        searchBlogPosts,
        deleteBlogPost,
        trashBlogPost,

        getBlogPostsCommet,
        editBlogPostsCommet,
        deleteBlogPostsCommet,
        checkBlogPostSlugAvailability,
    }
}
