import { useCallback, useState } from "react";

import axios from "axios";

import { useUserStore } from "@/state/userStore";
import { useSettingStore } from "@/state/settingStore";

import { apiEndpoint } from "@/util/resources";
import { releaseInterface } from "@/typeInterfaces/release.interface";


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
    const accessToken = useUserStore((state) => state.accessToken);
    // const userData = useUserStore((state) => state.userData);
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
            const response = (await axios.get(`${apiEndpoint}/admin/dashboard-topTotal-analysis`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })).data;
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

    const getBestPerformingProjects = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/best-performing-projects`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })).data;
            console.log(response);

            if (response.status) {
                setBestPerformingProjects(response.result);
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
