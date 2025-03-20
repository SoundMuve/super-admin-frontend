import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";
import { contactUsInterface } from "@/typeInterfaces/contactInterface";
import { useGeneralStore } from "@/state/generalStore";
import apiClient, { apiErrorResponse } from "@/util/apiClient";

export function useContactHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [contactMessages, setContactMessages] = useState<contactUsInterface[]>([]);
    const _setContactDetails = useGeneralStore((state) => state._setContactDetails);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const getContactMessages = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/contact`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            if (response.status) {
                // _setCouponData(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
                setContactMessages(response.result.data);
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

    const getContactMessagesById = useCallback(async (contact_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/contact/contact-by-id`, {
                params: { contact_id }
            })).data;
            // console.log(response);

            if (response.status) {
                _setContactDetails(response.result);
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


    const sendReplyMsg = useCallback(async (replyMsg: string, contact_id: string) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await apiClient.put(`/admin/contact/reply`, 
                { 
                    contact_id, replyMsg,
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
                _setContactDetails(response.result);

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
    }, []);



    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        contactMessages, 
        getContactMessages,
        getContactMessagesById,
        sendReplyMsg

    }
}
