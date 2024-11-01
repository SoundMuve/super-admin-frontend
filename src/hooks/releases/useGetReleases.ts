import axios from "axios";
import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { releaseInterface } from "@/typeInterfaces/release.interface";

export function useGetReleases() {
    const accessToken = useUserStore((state) => state.accessToken);

    const [limitNo, setLimitNo] = useState(20);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [allReleases, setAllReleases] = useState<releaseInterface[]>([]);
    const [releases, setReleases] = useState<releaseInterface[]>([]);

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

    const searchReleases = useCallback(async (searchWord: string, pageNo: number, limitNo: number,) => {
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


    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        // singleReleases, albumReleases,
        releases, 
        getReleases,
        searchReleases,
    }
}
