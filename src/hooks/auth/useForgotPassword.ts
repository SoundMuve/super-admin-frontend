import { useState } from "react";

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

// import { useUserStore } from "@/state/userStore";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSettingStore } from "@/state/settingStore";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address")
});


export function useForgotPasswordAuth() {
    const navigate = useNavigate();
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });
        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await apiClient.post(`/auth/sendPasswordResetEmail`, formData )).data;
            // console.log(response);
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            const resData = {
                email: formData.email,
                token: response.token
            }

            navigate({
                pathname: "/auth/verify-email",
                search: `?${createSearchParams(resData)}`,
            });

        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }


    // const onSubmit = useCallback(() => {
    //     handleSubmit(_onSubmit)
    // }, []);


    return {
        errors,
        isValid,
        isSubmitting,
        // formSchema,
        onSubmit: handleSubmit(onSubmit),
        register,

        // toastNotification, setToastNotification,

        apiResponse,
    }
}
