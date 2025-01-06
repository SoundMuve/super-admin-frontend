import { useCallback, useState } from "react";

import axios from "axios";

import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";

import { apiEndpoint } from "@/util/resources";
import { revenueTransactionInterface, topTotalTransactionAnalysisInterface, transactionRevenueDetailsInterface } from "@/typeInterfaces/transaction.interface";


export function useTransactionHook() {
    const accessToken = useUserStore((state) => state.accessToken);
    // const userData = useUserStore((state) => state.userData);
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
            const response = (await axios.get(`${apiEndpoint}/admin/transactions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
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
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getWithdrawalRequest = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/transactions/withdrawal-request`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                // params: {
                //     page: pageNo,
                //     limit: limitNo,
                // }
            })).data;
            // console.log(response);

            if (response.status) {
                setWithdrawalRequests(response.result);

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
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getTopTotalTransactionAnalysis = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/transactions/total-transaction-analysis`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                // params: {
                //     page: pageNo,
                //     limit: limitNo,
                // }
            })).data;
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
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getTransactionById = useCallback(async (transaction_id: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/transactions/transaction-by-id`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
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
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
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
    }
}
