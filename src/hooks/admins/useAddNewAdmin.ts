import { useCallback, useState } from "react";

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { passwordRegex } from "@/util/resources";
// import { useSettingStore } from "@/state/settingStore";
import { userInterface } from "@/typeInterfaces/users.interface";
import { defaultUserLocation } from "@/util/location";
import { useSettingStore } from "@/state/settingStore";
import { activityLogInterface } from "@/typeInterfaces/activityLogInterface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


const emailFormSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address")
});

const newAdminPreviewSchema = yup.object({
    _id: yup.string().trim(),
    firstName: yup.string().required().min(2).trim().label("First Name"),
    lastName: yup.string().required().min(2).trim().label("Last Name"),

    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(passwordRegex,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),

    role: yup.string().required().min(3).trim().label("Role"),

    // tnc: yup.boolean().required().label("Terms and conditions")
});


export function useAddNewAdmin() {
    // const accessToken = useUserStore((state) => state.accessToken);

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
    const [activityLogs, setActivityLogs] = useState<activityLogInterface[]>([]);


    const [allAdmins, setAllAdmins] = useState<userInterface[]>();

    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailUserData, setEmailUserData] = useState<userInterface>();
    // const [openNewAdminPreviewPage, setOpenNewAdminPreviewPage] = useState(false);
    const [newAdminCurrentPage, setNewAdminCurrentPage] = useState<"email" | "preview" | "success">("email");

    const emailForm = useForm({ 
        resolver: yupResolver(emailFormSchema),
        mode: 'onBlur', reValidateMode: 'onChange', 
    });

    const newAdminPreviewForm = useForm({ 
        resolver: yupResolver(newAdminPreviewSchema),
        mode: 'onBlur', // reValidateMode: 'onChange',
        defaultValues: {
            email: emailUserData?.email || enteredEmail,
            firstName: emailUserData?.firstName || "",
            lastName: emailUserData?.lastName || "",
            password: emailUserData?.password || "",
        }
    });


    const submitEmailForm = useCallback(async (formData: typeof emailFormSchema.__outputType) => {
        setEnteredEmail(formData.email);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
    
        try {
            const response = (await apiClient.get(`/admin/get-user-by-email`, {
                params: { email: formData.email }
            })).data;
            // console.log(response);
    
            if (response.status) {
                newAdminPreviewForm.setValue(
                    "email", formData.email,
                    {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                );
                // setOpenNewAdminPreviewPage(true);
                setNewAdminCurrentPage("preview");

                if (response.result) {
                    setEmailUserData(response.result);

                    newAdminPreviewForm.setValue(
                        "_id", response.result._id || '',
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                    );

                    newAdminPreviewForm.setValue(
                        "firstName", response.result.firstName || '',
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                    );

                    newAdminPreviewForm.setValue(
                        "lastName", response.result.lastName || '',
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                    );

                    newAdminPreviewForm.setValue(
                        // "password", response.result.password,
                        "password", 'Nothing to 3ee Here @ya move on.',
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                    );


                    newAdminPreviewForm.setValue(
                        "role", response.result.role,
                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                    );
                    
                };

            }
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
    
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);
            
            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);

    const submitNewAdminPreviewForm = useCallback(async (formData: typeof newAdminPreviewSchema.__outputType) => {
        try {
            if (formData.role == "role") {
                setApiResponse({
                    display: true,
                    status: false,
                    message: "Please select a role",
                });
                return;
            }

            const data2db = {
                user_id: formData._id || emailUserData?._id || null,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                location: defaultUserLocation,
                newRole: formData.role,
                tnc: true,
            };
            
            const response = (await apiClient.post(`/admin/add-new-admin`, data2db )).data;
            // console.log(response);
            
            if (response.status) {
                // todo open the success modal
                setNewAdminCurrentPage("success");

                setEmailUserData(response.result);
                setEnteredEmail(data2db.email);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message,
            });
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }

    }, []);

    const getAllAdmins = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/admin/get-all-admin`)).data;
            // console.log(response);
            
            if (response.status) {
                setAllAdmins(response.result)
            }
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }

    }, []);

    const blockOrRemoveAdmin = useCallback(async (action: 'block' | 'remove', user_id: string) => {
        try {

            const response = (await apiClient.patch(`/admin/block-remove-admin`, 
                { user_id, action }, 
            )).data;
            // console.log(response);

            getAllAdmins();

            _setToastNotification({
                display: true,
                status: response.status ? "success" : "info",
                message: response.message
            });

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }

    }, []);

    
    const getActivityLog = useCallback(async (user_id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await apiClient.get(`/admin/activity-log`, {
                params: {
                    user_id,
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            console.log(response);
            

            if (response.status) {
                // _setCouponData(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setActivityLogs(response.result.data);
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


    return {
        apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages, 
        activityLogs, getActivityLog,

        allAdmins, getAllAdmins,
        blockOrRemoveAdmin,

        enteredEmail,
        emailUserData, setEmailUserData,
        // openNewAdminPreviewPage, setOpenNewAdminPreviewPage,
        newAdminCurrentPage, setNewAdminCurrentPage,

        emailForm,
        // emailFormState: emailForm.formState,
        submitEmailForm: emailForm.handleSubmit(submitEmailForm),


        newAdminPreviewForm,
        submitNewAdminPreviewForm: newAdminPreviewForm.handleSubmit(submitNewAdminPreviewForm),

    }
}
