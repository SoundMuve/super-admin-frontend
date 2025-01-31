import axios from "axios";
import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { couponInterface } from "@/typeInterfaces/cartInterface";
import { useCouponStore } from "@/state/couponStore";

export function useCoupon() {
    const accessToken = useUserStore((state) => state.accessToken);
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [couponApplications, setCouponApplications] = useState<couponInterface[]>([]);
    const _setCouponData = useCouponStore((state) => state._setCouponData);
    const _setCouponDetails = useCouponStore((state) => state._setCouponDetails);


    const getCouponApplications = useCallback(async (pageNo: number, limitNo: number) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/coupon`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;

            if (response.status) {
                _setCouponData(response.result.coupons);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);

                setIsSubmitting(false);
                setCouponApplications(response.result.coupons);

                // if (pageNo == 1 || !couponApplications.length) {
                //     setCouponApplications(response.result.coupons);
    
                //     return;
                // }
                // const oldCoupon = couponApplications.length ? couponApplications : [];
                // setCouponApplications([ ...oldCoupon, ...response.result.coupons ]);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

    
        } catch (error: any) {
            console.log(error);
            
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setReleases([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getCouponById = useCallback(async (coupon_id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/coupon/coupon-by-id`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: { coupon_id }
            })).data;
            // console.log(response);

            if (response.status) {
                _setCouponDetails(response.result);
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

    const approveDiscount = useCallback(async (coupon_id: string, discountPercentage: string) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/admin/coupon/approve`, 
                { coupon_id, discountPercentage }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) {
                _setCouponDetails(response.result);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

            setApiResponse({
                display: true,
                status: true,
                message: response.message,
            });
            
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setReleases([]);

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
        }
    }, []);

    const rejectDiscount = useCallback(async (coupon_id: string) => {
        try {
            const response = (await axios.post(`${apiEndpoint}/admin/coupon/reject`, 
                { coupon_id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) _setCouponDetails(response.result);
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message || "successful!"
            });

            setApiResponse({
                display: true,
                status: true,
                message: response.message,
            });

        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);
            // setReleases([]);

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
        }
    }, []);


    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        // singleReleases, albumReleases,
        couponApplications, 
        getCouponApplications,
        getCouponById,
        approveDiscount,
        rejectDiscount,
    }
}
