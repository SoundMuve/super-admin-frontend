import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { getDecryptedLocalStorage, setEncryptedLocalStorage } from "@/util/storage";
import { useSettingStore } from "@/state/settingStore";
import { defaultUserLocation, getUserLocation } from "@/util/location";
import { locationInterface } from "@/typeInterfaces/users.interface";


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),
});

export function useLoginAuth() {
    const navigate = useNavigate();
    const _loginUser = useUserStore((state) => state._loginUser);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userLocation, setUserLocation] = useState<locationInterface>(defaultUserLocation);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        const result = getDecryptedLocalStorage('uad');
        if (result) {
            setValue("email", result.email || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("password", result.password || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        }

        getUserLocation().then((res) => {
            // console.log(res);
            if (res) setUserLocation(res);
        });
    }, []);
    
    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });
        
    const _onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const loginData = {
                location: userLocation,
                email: formData.email,
                password: formData.password
            };
            const response = (await axios.post(`${apiEndpoint}/auth/admin/login`, loginData )).data;

            if (response.status) {
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

                // uad - user auth data;
                if (rememberMe) setEncryptedLocalStorage('uad', formData);

                // if (response.role == 'user' ) {
                //     _signUpUser(response.result);
                    
                //     navigate("/auth/signup-type");
                //     return;
                // }

                _loginUser(response.result, response.token);

                navigate("/admin/", {replace: true});
                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message || "Oooops, login failed. please try again."
            });
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, login failed. please try again.";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
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
        formSchema,
        onSubmit: handleSubmit(_onSubmit),
        register,

        handleClickShowPassword,

        rememberMe,
        setRememberMe,

        showPassword,
        setShowPassword,

        apiResponse,
    }
}



