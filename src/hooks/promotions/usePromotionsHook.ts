import { useCallback, useState } from "react";

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";
import { promotionInterface } from "@/typeInterfaces/promotions.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    title: yup.string().trim().label("Title"),
    userType: yup.string().trim().required().label("User Dashboard Type"),
    image: yup.string().trim().required().label("Image"),
});

export function usePromotionsHook() {
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
            const response = (await apiClient.get(`/admin/promotions/active`)).data;

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
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const getAllPromotions = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/promotions`, {
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
            apiErrorResponse(error, "Oooops, something went wrong", true);

            setIsSubmitting(false);
        }
    }, []);

    const updatePromotion = useCallback(async (
        _id: string, action: "status" | "delete", actionValue: boolean,
        successFunc = (_resData: any) => {}
    ) => {
        setIsUploadSuccessful(false);

        try {
            const response = (await apiClient.post(`/admin/promotions/update`, 
                { 
                    promotional_id: _id, action, actionValue 
                }
            )).data;

            if (response.status) {
                setSelectedPromotion(response.result);
                successFunc(response.result);
                setIsUploadSuccessful(true);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });
    
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);

    
    const _onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await apiClient.post(`/admin/promotions/upload`, 
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
                uploadBannerForm.reset();
                setImage(null);
                setImagePreview(undefined);

                setIsUploadSuccessful(true);
            }

        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
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
