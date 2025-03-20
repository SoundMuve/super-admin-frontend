import { useCallback, useState } from "react";
// import axios from "axios";
// import { useUserStore } from "@/state/userStore";
// import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { transactionInterface } from "@/typeInterfaces/transaction.interface";
import kolors from "@/constants/kolors";
import { totalEarningsAnalyticsInterface } from "@/typeInterfaces/analytics.interface";
import { useReleaseStore } from "@/state/releaseStore";
import { useUserAnalyticsStore } from "@/state/userAnalyticsStore";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


export function useUserAnalyticsHook(_id: string) {
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
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [transactions, setTransactions] = useState<transactionInterface[]>();

    // const [salesReportSingleAnalytics, setSalesReportSingleAnalytics] = useState<albumAndSinglesAnalyticsInterface[]>();
    // const [salesReportAlbumAnalytics, setSalesReportAlbumAnalytics] = useState<albumAndSinglesAnalyticsInterface[]>();
    // const [salesReportLocationsAnalytics, setSalesReportLocationsAnalytics] = useState<locationAnalyticsInterface[]>();
    // const [salesReportMonthlyAnalytics, setsalesReportMonthlyAnalytics] = useState<analyticsInterface[]>();
    // const [salesReportMainDashData, setsalesReportMainDashData] = useState<totalEarningsAnalyticsInterface>();

    const _setSalesReportTotalEarnings = useUserAnalyticsStore((state) => state._setSalesReportTotalEarnings);
    const _setSalesReportMonths = useUserAnalyticsStore((state) => state._setSalesReportMonths);
    const _setSalesReportLocations = useUserAnalyticsStore((state) => state._setSalesReportLocations);
    const _setSalesReportAlbum = useUserAnalyticsStore((state) => state._setSalesReportAlbum);
    const _setSalesReportSingles = useUserAnalyticsStore((state) => state._setSalesReportSingles);

    const [songTotalEarningsAnalytics, setSongTotalEarningsAnalytics] = useState<totalEarningsAnalyticsInterface>();
    const [albumTotalEarningsAnalytics, setAlbumTotalEarningsAnalytics] = useState<totalEarningsAnalyticsInterface>();
    // const [songReleaseData, setSongReleaseData] = useState<releaseInterface>();
    // const [songData, setSongData] = useState<songInterface>();

    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);
    

    const getTransactionHistory = useCallback(async (pageNo: number, limitNo: number, startDate: string, endDate: string) => {
        if (!_id) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Invalid user id"
            });

            return;
        }

        try {
            const response = (await apiClient.get(`/transactions/get-transactions/${_id}`, {
                params: {
                    page: pageNo, limit: limitNo,
                    startDate, endDate,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setTransactions(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);


    const getSalesReportAnalytics = useCallback(async (startDate: string, endDate: string) => {
        if (!_id) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Invalid user id"
            });

            return;
        }

        try {
            const response = (await apiClient.get(`/analytics/get-salesreport-analytics/${_id}`, {
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // setsalesReportMainDashData(response.result.totalsEarnings);
                _setSalesReportTotalEarnings(response.result.totalsEarnings);
                // months
                // setsalesReportMonthlyAnalytics(response.result.salesReportMonths);
                _setSalesReportMonths(response.result.salesReportMonths);
                // location
                // setSalesReportLocationsAnalytics(response.result.salesReportLocation);
                _setSalesReportLocations(response.result.salesReportLocation);
                // albums
                // setSalesReportAlbumAnalytics(response.result.salesReportAlbums);
                _setSalesReportAlbum(response.result.salesReportAlbums);
                // singles
                // setSalesReportSingleAnalytics(response.result.salesReportSingles);
                _setSalesReportSingles(response.result.salesReportSingles);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);

    const getSongAnalytics = useCallback(async (startDate: string, endDate: string, songId: string, release_id: string) => {
        if (!_id) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Invalid user id"
            });

            return;
        }

        try {
            const response = (await apiClient.get(`/analytics/get-song-analytics/${_id}`, {
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                    songId, release_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // songTotalEarningsAnalytics
                setSongTotalEarningsAnalytics(response.result.totalsEarnings);
                // songReleaseData
                // setSongReleaseData(response.result.release);
                _setReleaseDetails(response.result.release);
                // songData
                // setSongData(response.result.song);
                _setSongDetails(response.result.song);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);

    const getAlbumAnalytics = useCallback(async (startDate: string, endDate: string, release_id: string) => {
        if (!_id) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Invalid user id"
            });

            return;
        }

        try {
            const response = (await apiClient.get(`/analytics/get-album-analytics/${_id}`, {
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                    release_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // songTotalEarningsAnalytics
                setAlbumTotalEarningsAnalytics(response.result.totalsEarnings);
                // songReleaseData
                // setSongReleaseData(response.result.release);
                _setReleaseDetails(response.result.release);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", true);
        }
    }, []);


    const handleStatusDisplay = (status: "Pending" | "Processing" | "Success" | "Complete" | "Failed") => {

        if (status.toLowerCase() == 'complete') {
            return {
                bgcolor: "#B4D28A",
                color: "#33500B"
            };
        } else if (status.toLowerCase() == 'failed') {
            return {
                bgcolor: "#701920",
                color: "#D2A5A9"
            };
        } else if (status.toLowerCase() == 'success') {
            return {
                bgcolor: "#435925",
                color: '#B6D787'
            };
        } else if (status.toLowerCase() == 'pending') {
            return {
                bgcolor: "#825600",
                color: "#D3AA5A"
            };
        } else if (status.toLowerCase() == 'processing') {
            return {
                bgcolor: kolors.primary,
                color: kolors.milk
            };
        } else {
            return {
                bgcolor: "",
                color: ''
            };
        }
    }
    
 
    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,
        
        // isSubmitting,

        transactions,
        getTransactionHistory,

        getSalesReportAnalytics,

        songTotalEarningsAnalytics,
        // songReleaseData,
        // songData,
        getSongAnalytics,

        albumTotalEarningsAnalytics,
        getAlbumAnalytics,

        handleStatusDisplay,
    }
}
