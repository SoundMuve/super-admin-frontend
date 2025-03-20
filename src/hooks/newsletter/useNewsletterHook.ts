import { useCallback, useState } from "react";

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";
import { useGeneralStore } from "@/state/generalStore";
import { 
    newsLetterInterface, newsLetterSubscribersInterface 
} from "@/typeInterfaces/contactInterface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    title: yup.string().trim().required().label("Title"),
    message: yup.string().trim().required().label("Message"),
});

export function useNewsletterHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const _setNewsLetterDetails = useGeneralStore((state) => state._setNewsLetterDetails);

    const [subscribers, setSubscribers] = useState<newsLetterSubscribersInterface[]>([]);
    const [newsletters, setNewsletters] = useState<newsLetterInterface[]>([]);
    const [reactQuillValue, setReactQuillValue] = useState('');


    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const sendNewsletterForm = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const getNewsLetterSubscribers = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/newsletter/subscribers`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            if (response.status) {
                setSubscribers(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const getSentNewsLetters = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/newsletter`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            if (response.status) {
                setNewsletters(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const getSentNewsLetterById = useCallback(async (newsletter_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/newsletter/newsletter-by-id`, {
                params: { newsletter_id }
            })).data;
            // console.log(response);

            if (response.status) {
                _setNewsLetterDetails(response.result);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);


     
    const _onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await apiClient.post(`/admin/newsletter/sendNewsletter`, 
                { 
                    ...formData,
                    user_name: userData.firstName + " " + userData.lastName, 
                }
            )).data;
            // console.log(response);

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

            if (response.status) {
                // _setContactDetails(response.result);

                setReactQuillValue("");
                sendNewsletterForm.reset();
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


    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        reactQuillValue, setReactQuillValue,
        // start of form controls
        errors: sendNewsletterForm.formState.errors,
        isValid: sendNewsletterForm.formState.isValid,
        isSubmittingForm: sendNewsletterForm.formState.isSubmitting,
        sendNewsletterForm,
        onSubmit: sendNewsletterForm.handleSubmit(_onSubmit),
        register: sendNewsletterForm.register,
        // end of form controls

        subscribers,
        newsletters,

        getNewsLetterSubscribers,
        getSentNewsLetters,
        getSentNewsLetterById,

    }
}
