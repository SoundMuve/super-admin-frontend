import { useCallback, useState } from "react";

import { useSettingStore } from "@/state/settingStore";

import { releaseInterface } from "@/typeInterfaces/release.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


interface dashboardTotalAnalysisInterface {
    users: {
        totalUsers: number;
        totalArtist: number;
        totalRl: number;
    };
    revenue: {
        totalUsersBalance: number;
        totalTransactionAmount: number;
    };
    projects: {
        totalLiveReleases: number;
        totalReleases: number;
    };
}

type bestPerformingProjectsInterface = releaseInterface & { totalRevenue: number };

export function useDashboardHook() {
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    // const [limitNo, setLimitNo] = useState(25);
    // const [currentPageNo, setCurrentPageNo] = useState(1);
    // const [totalRecords, setTotalRecords] = useState(0);
    // const [totalPages, setTotalPages] = useState(1);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [dashboardTotalAnalysis, setDashboardTotalAnalysis] = useState<dashboardTotalAnalysisInterface>();
    const [bestPerformingProjects, setBestPerformingProjects] = useState<bestPerformingProjectsInterface[]>();


    const getDashboardTotalAnalysis = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/admin/dashboard-topTotal-analysis`)).data;
            // console.log(response);

            if (response.status) {
                setDashboardTotalAnalysis(response.result);
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

    const getBestPerformingProjects = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/admin/best-performing-projects`)).data;
            // console.log(response);

            if (response.status) {
                setBestPerformingProjects(response.result);
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

        // limitNo, setLimitNo,
        // currentPageNo, totalRecords,
        // totalPages,
        // isSubmitting,

        dashboardTotalAnalysis,
        bestPerformingProjects,

        getDashboardTotalAnalysis,
        getBestPerformingProjects,

    }
}
