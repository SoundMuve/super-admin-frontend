import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSettingStore } from "@/state/settingStore";
import { getQueryParams, passwordRegex } from "@/util/resources";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const formSchema = yup.object({
    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches( passwordRegex,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),

    confirmPassword: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches( passwordRegex,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Confirm Password"),
    
});


export function useNewPasswordAuth() {
    const navigate = useNavigate();
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
         
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (formData.password !== formData.confirmPassword) {
            setError("password", {message: "Passwords do not match"});
            setError("confirmPassword", {message: "Passwords do not match"});
            return;
        }

        const data2db = {
            email: getQueryParams('email'),
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };

        try {
            const response = (await apiClient.post(
                `/auth/setNewPassword`, 
                data2db,
                {
                    headers: {
                        Authorization: `Bearer ${getQueryParams("token")}`,
                    },
                }
            )).data;
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

            navigate("/auth/login", {replace: true});
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

        // userData,

        handleClickShowPassword,
        showPassword, setShowPassword,

        apiResponse,
    }
}
