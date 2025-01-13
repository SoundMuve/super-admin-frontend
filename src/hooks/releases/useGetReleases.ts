import axios from "axios";
import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { releaseInterface } from "@/typeInterfaces/release.interface";
import { useReleaseStore } from "@/state/releaseStore";
import { useSettingStore } from "@/state/settingStore";

export function useGetReleases() {
    const accessToken = useUserStore((state) => state.accessToken);

    const [limitNo, setLimitNo] = useState(20);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [allReleases, setAllReleases] = useState<releaseInterface[]>([]);
    const [releases, setReleases] = useState<releaseInterface[]>([]);
    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const getReleases = useCallback(async (pageNo: number, limitNo: number, releaseType?: 'single' | 'album') => {

        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/releases`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                    releaseType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setAllReleases([ ...allReleases, ...response.result.relases ]);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);

                if (pageNo == 1 || !releases) {
                    setReleases(response.result.relases);
    
                    // if (releaseType == "single") setSingleReleases(response.result.relases);
                    // if (releaseType == "album") setAlbumReleases(response.result.relases);

                    return;
                }

                const oldReleases = releases ? releases : [];
                setReleases([ ...oldReleases, ...response.result.relases ]);
            }
    
            if (!response.result.relases.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "There is no release yet."
                });
            }
    
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setReleases([]);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getReleaseById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/releases/release-by-id`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: { id }
            })).data;
            // console.log(response);

            if (response.status) {
                _setReleaseDetails(response.result);

                if (response.result.songs.length) _setSongDetails(response.result.songs[0]);
        
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const searchReleases = useCallback(async (searchWord: string, pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/releases/search`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    search: searchWord,
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // setAllReleases([ ...allReleases, ...response.result.relases ]);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);

                if (pageNo == 1 || !releases) {
                    setReleases(response.result.relases);
    
                    // if (releaseType == "single") setSingleReleases(response.result.relases);
                    // if (releaseType == "album") setAlbumReleases(response.result.relases);

                    return;
                }

                const oldReleases = releases ? releases : [];
                setReleases([ ...oldReleases, ...response.result.relases ]);
            }
    
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const handleSubmitLiveStatus = useCallback(async (
        status: string, release_id: string, linkTreeUrl = "", upcEanCode = "",
        modalFn: any = () => {}
    ) => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        if (linkTreeUrl && linkTreeUrl.length < 5) {
            setApiResponse({
                display: true,
                status: false,
                message: 'Incorrect url'
            });

            return;
        }

        // setIsSubmitting(true);

        try {
            const response = (await axios.post(`${apiEndpoint}/admin/releases/update-status`, 
                { status, linkTreeUrl, upcEanCode, release_id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) {
                _setReleaseDetails(response.result);
                modalFn()
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);

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

            // setIsSubmitting(false);
        }
    }, []);


    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        // singleReleases, albumReleases,
        releases, 
        getReleases,
        getReleaseById,
        searchReleases,
        handleSubmitLiveStatus,
    }
}
