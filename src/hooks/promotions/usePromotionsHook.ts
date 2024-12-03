import { useCallback, useState } from "react";

import axios from "axios";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { promotionInterface } from "@/typeInterfaces/promotions.interface";


const formSchema = yup.object({
    title: yup.string().trim().label("Title"),
    userType: yup.string().trim().required().label("User Dashboard Type"),
    image: yup.string().trim().required().label("Image"),
});

export function usePromotionsHook() {
    const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [image, setImage] = useState<Blob | null>(null);
    const [imagePreview, setImagePreview] = useState();

    const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

    const [activePromotions, setActivePromotions] = useState<promotionInterface[]>([]);
    const [allPromotions, setAllPromotions] = useState<promotionInterface[]>([]);
    const [selectedPromotion, setSelectedPromotion] = useState<promotionInterface>();

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const uploadBannerForm = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const getAllActivePromotions = useCallback(async () => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/promotions/active`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                // params: {
                //     page: pageNo,
                //     limit: limitNo,
                // }
            })).data;

            if (response.status) {
                setActivePromotions(response.result);

                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getAllPromotions = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/promotions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            if (response.status) {
                setAllPromotions(response.result.data);

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
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const updatePromotion = useCallback(async (_id: string, action: "status" | "delete", actionValue: boolean) => {
        setIsUploadSuccessful(false);

        try {
            const response = (await axios.post(`${apiEndpoint}/admin/promotions/update`, 
                { 
                    promotional_id: _id, action, actionValue 
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    // params: {
                    //     page: pageNo,
                    //     limit: limitNo,
                    // }
                }
            )).data;

            if (response.status) {
                setSelectedPromotion(response.result);
                setIsUploadSuccessful(true);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    
    const _onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await axios.post(`${apiEndpoint}/admin/promotions/upload`, 
                { 
                    ...formData,
                    user_name: userData.firstName + " " + userData.lastName, 
                }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

            if (response.status) {
                uploadBannerForm.reset();
                setImage(null);
                setImagePreview(undefined);

                setIsUploadSuccessful(true);
            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsUploadSuccessful(false);
        }
    }


    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        // start of form controls
        errors: uploadBannerForm.formState.errors,
        isValid: uploadBannerForm.formState.isValid,
        isSubmittingForm: uploadBannerForm.formState.isSubmitting,
        uploadBannerForm,
        onSubmit: uploadBannerForm.handleSubmit(_onSubmit),
        register: uploadBannerForm.register,
        // end of form controls

        image, setImage,
        imagePreview, setImagePreview,

        isUploadSuccessful,

        activePromotions, getAllActivePromotions,
        allPromotions, getAllPromotions,
        selectedPromotion, setSelectedPromotion,
        updatePromotion,

    }
}
