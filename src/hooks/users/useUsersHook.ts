import axios from "axios";
import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { userInterface } from "@/typeInterfaces/users.interface";
import { useGeneralStore } from "@/state/generalStore";
import { releaseInterface } from "@/typeInterfaces/release.interface";
import { recordLabelArtistInterface } from "@/typeInterfaces/recordLabelArtist.interface";


type topStatsInterface = userInterface & {releaseCount: number};

export function useUsersHook() {
    const accessToken = useUserStore((state) => state.accessToken);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [users, setUsers] = useState<userInterface[]>([]);
    const [topUserBalances, setTopUserBalances] = useState<topStatsInterface[]>();
    const [topReleases, setTopReleases] = useState<topStatsInterface[]>();
    const [artistReleases, setArtistReleases] = useState<releaseInterface[]>();
    const [releases, setReleases] = useState<releaseInterface[]>();
    const [rlArtists, setRlArtists] = useState<recordLabelArtistInterface[]>();
    const [rlArtistsCount, setRlArtistsCount] = useState<number>(0);
    const [releaseCount, setReleaseCount] = useState<number>(0);
    
    const _setSelectedUserDetails = useGeneralStore((state) => state._setSelectedUserDetails);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const getUsers = useCallback(async (pageNo: number, limitNo: number, userType: 'All' | 'artist' | 'record label' = "All") => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                    userType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setUsers(response.result.data);

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

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getUserById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/user-by-id`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: { id }
            })).data;
            // console.log(response);

            if (response.status) {
                _setSelectedUserDetails(response.result.user);
                setRlArtistsCount(response.result.rlArtistCount);
                setReleaseCount(response.result.releasesCount);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
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

    const getUsersTopStats = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/top-stats`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                // params: { id }
            })).data;
            // console.log(response);

            if (response.status) {
                setTopUserBalances(response.result.topBalances);
                setTopReleases(response.result.topReleases);
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

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getUserReleases = useCallback(async (id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/releases`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                    user_id: id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleases(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
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
            setReleases([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getRlArtistReleases = useCallback(async (user_id: string, artist_id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/rl-artist-releases`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                    user_id, artist_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setArtistReleases(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
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
            setReleases([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getRecordLabelUserArtists = useCallback(async (id: string, pageNo: number, limitNo: number) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/rl-artist`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                    user_id: id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setRlArtists(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
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
            setRlArtists([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const searchUsers = useCallback(async (searchWord: string, pageNo: number = 1, limitNo: number = 100) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/users/search`, {
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
                setUsers(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
            }
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const handleUserStatus = useCallback(async (
        user_id: string, currentStatus: boolean
    ) => {

        try {
            const response = (await axios.post(`${apiEndpoint}/admin/users/update-status`, 
                { currentStatus, user_id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) {
                _setSelectedUserDetails(response.result);
                // modalFn()
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
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

        // singleUsers, albumUsers,
        users, 
        getUsers,
        getUserById,
        searchUsers,
        handleUserStatus,

        rlArtistsCount,
        releaseCount,

        releases,
        getUserReleases,

        artistReleases,
        getRlArtistReleases,

        rlArtists,
        getRecordLabelUserArtists,

        topReleases,
        topUserBalances,
        getUsersTopStats
    }
}
