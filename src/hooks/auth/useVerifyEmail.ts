import { useState } from "react";

import axios from "axios";

// import { useUserStore } from "@/state/userStore";
import { apiEndpoint, getQueryParams } from "@/util/resources";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSettingStore } from "@/state/settingStore";


export function useVerifyEmailAuth() {
    const navigate = useNavigate();
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [code, setCode] = useState(new Array(4).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const userData = useUserStore((state) => state.userData);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [jwtToken, setJwtToken] = useState(getQueryParams("token"));
    
    
    const handleChange = (e: any, index: any) => {
        if (isNaN(e.target.value)) return false;
        setCode([ ...code.map((data, i) => (i === index ? e.target.value : data)) ])

        // set focus on the next input when the first value is set.
        const nextSibling = document.getElementById(`code${index + 1}`);
        if (e.target.value && nextSibling) {
            // console.log(e.target.nextSibling);
            document.getElementById(`code${index + 1}`)?.focus();
        }



        // const focusInput = e.target.parentNode.querySelector("input:focus");
        // console.log(focusInput);
        
        // if (focusInput) {
        //     focusInput.blur(); // remove focus from the input's
        // }

    }

    const handlePaste = (e: any) => {
        const value = e.clipboardData.getData("text");
        // console.log(value);
        
        if (isNaN(value)) return false; // check if its a number
        // converts it to an array of string and ensure the length of the string is same as that of the code
        const updatedValue = value.toString().split("").slice(0, code.length); 
        setCode(updatedValue);

        const focusInput = e.target.parentNode.querySelector("input:focus");
        if (focusInput) {
            focusInput.blur(); // remove focus from the input's
        }


        // // focus on the last input 
        // const lastInput = document.getElementById(`code${code.length - 1}`);
        // if (lastInput) {
        //     lastInput.focus();
        // } 
    }

    const handleDelete = (e: any, _index: any) => {
        if ((e.which === 8 || e.keyCode === 8) && e.target.value === "") {
            const updatedValue = code.join('').split('').concat(Array(code.length).fill('')).slice(0, code.length);
            setCode(updatedValue);

            const lastInput = document.getElementById(`code${code.join('').length - 1}`);
            if (lastInput) {
                lastInput.focus();
            } 
            return;
        }

        // const newValue = e.key;
        // const oldValue = e.target.value;
        
        // if (isNaN(e.target.value)) return false;
        // if (code[index] == oldValue) {
        //     setCode([ ...code.map((data, i) => (i === index ? newValue : data)) ])
        // }
    }

        
    const onSubmit = async () => {
        setIsSubmitting(true);
           
        setApiResponse({
            display: false,
            status: true,
            message: ''
        });

        const data2db = {
            // email: getQueryParams('email'),
            code: code.join('')
        };
        
        try {
            const response = (await axios.post(
                `${apiEndpoint}/auth/verifyEmailToken`, 
                data2db,
                {
                    headers: {
                        Authorization: `reset-password-token ${jwtToken}`,
                    },
                }
            )).data;
            
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

            navigate({
                pathname: "/auth/create-new-password",
                search: `?${createSearchParams({ 
                    email: getQueryParams('email'),
                    token: jwtToken
                })}`,
            }, {replace: true});

            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response.data || error;

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to send email otp. please try again."
            });
            setIsSubmitting(false);
        }
    }
           
    const handleResendOtp = async () => {
        try {
            const response = (await axios.post(
                `${apiEndpoint}/auth/sendPasswordResetEmail`, 
                { email: getQueryParams('email') } 
            )).data;
            // console.log(response);

            setJwtToken(response.token);
  
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, failed to send email otp. please try again.";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }


    // const onSubmit = useCallback(() => {
    //     handleSubmit(_onSubmit)
    // }, []);


    return {
        isSubmitting,
        code, setCode,
        // userData,
        email: getQueryParams('email'),
        
        onSubmit,
        handleResendOtp,
        handleDelete,
        handlePaste,
        handleChange,

        apiResponse,
    }
}
