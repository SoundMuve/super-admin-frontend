import { useCallback, useState } from "react";

import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";

import { 
    revenueTransactionInterface, topTotalTransactionAnalysisInterface, 
    transactionRevenueDetailsInterface 
} from "@/typeInterfaces/transaction.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


export function useTransactionHook() {
    // const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [revenueTransactions, setRevenueTransactions] = useState<revenueTransactionInterface[]>();
    const [withdrawalRequests, setWithdrawalRequests] = useState<revenueTransactionInterface[]>();
    const [totalTransactionAnalysis, setTotalTransactionAnalysis] = useState<topTotalTransactionAnalysisInterface>();
    const [transactionRevenueDetails, setTransactionRevenueDetails] = useState<transactionRevenueDetailsInterface>();

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const getTransactions = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/admin/transactions`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                    // userType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setRevenueTransactions(response.result.data);

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

    const getWithdrawalRequest = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/admin/transactions/withdrawal-request`)).data;
            // console.log(response);

            if (response.status) {
                setWithdrawalRequests(response.result.data);

                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);
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

    const getTopTotalTransactionAnalysis = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/admin/transactions/total-transaction-analysis`)).data;
            // console.log(response);

            if (response.status) {
                setTotalTransactionAnalysis(response.result);
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

    const getTransactionById = useCallback(async (transaction_id: string) => {
        try {
            const response = (await apiClient.get(`/admin/transactions/transaction-by-id`, {
                params: {
                    transaction_id,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setTransactionRevenueDetails(response.result);
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


    const handleRejectedAndManualPayment = useCallback(async (
        user_id: string, transaction_id: string, 
        actionType: "reject" | "manually paid",
        adminName = userData.firstName + " " + userData.lastName
    ) => {
        try {
            const response = (await apiClient.post(`/admin/transactions/update-status`, 
                { user_id, transaction_id, actionType, adminName }, 
            )).data;
            // console.log(response);

            if (response.status) {
                // _setSelectedUserDetails(response.result);

                const newTransactionRevenueDetails: any = {
                    ...transactionRevenueDetails,
                    transaction: response.result.transaction,
                    user: response.result.user
                };
                setTransactionRevenueDetails(newTransactionRevenueDetails);
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

    const handleAcceptWithdrawal = useCallback(async (
        user_id: string, transaction_id: string, 
        payout_id: string,
        adminName = userData.firstName + " " + userData.lastName,
        transRevenueDetails = transactionRevenueDetails
    ) => {
        try {
            const response = (await apiClient.post(`/admin/transactions/accept-withdrawal`, 
                { user_id, transaction_id, payout_id, adminName }, 
            )).data;
            // console.log(response);

            if (response.status) {
                if (transRevenueDetails) {
                    setTransactionRevenueDetails({
                        ...transRevenueDetails,
                        transaction: response.result.transaction,
                        user: response.result.user
                    });
                }

                window.location.reload();
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

    const verifyPaypalWithdrawal = useCallback(async (
        transaction_id: string, payout_batch_id: string,
        transRevenueDetails = transactionRevenueDetails
    ) => {
        try {
            const response = (await apiClient.post(`/admin/transactions/verify-paypal-payment`, 
                { transaction_id, payout_batch_id }, 
            )).data;
            // console.log(response);

            if (response.status) {
                if (transRevenueDetails) {
                    setTransactionRevenueDetails({
                        ...transRevenueDetails,
                        transaction: response.result.transaction,
                        // user: response.result.user
                    });
                }

                window.location.reload();
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




    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        revenueTransactions,
        withdrawalRequests,
        totalTransactionAnalysis,
        transactionRevenueDetails,

        getTransactions,
        getWithdrawalRequest,
        getTopTotalTransactionAnalysis,
        getTransactionById,
        handleRejectedAndManualPayment,
        handleAcceptWithdrawal,
        verifyPaypalWithdrawal,
    }
}
