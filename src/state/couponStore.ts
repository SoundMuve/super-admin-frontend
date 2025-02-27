import { create } from "zustand";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { cartItemInterface, couponInterface } from "@/typeInterfaces/cartInterface";
import { getLocalStorage, setLocalStorage } from "@/util/storage";


const defaultCouponData: couponInterface = {
    user_id: "",
    _id: "",
    cartItems: [],
    user_name: "",
    user_email: "",
    youtubeLink: "",
    instagramFacebookLink: "",
    xLink: "",
    status: "Pending",
    createdAt: ""
};

const defaultCartItemData: cartItemInterface = {
    _id: "",
    release_id: "",
    user_email: "",
    user_id: "",
    artistName: "",
    coverArt: "",
    price: 0,
    preSaveAmount: 0,
    releaseType: "",
    title: "",
}


type _typeInterface_ = {
    couponData: couponInterface[];
    couponDetails: couponInterface;
    cartItemDetails: cartItemInterface;

    _setCouponData : (details: couponInterface[]) => void;
    _setCouponDetails : (details: couponInterface) => void;

    _restoreCouponDetails : () => void;

    // updatePlayerAsync: () => Promise<void>;
};
  

export const useCouponStore = create<_typeInterface_>((set) => ({
    couponData: [],
    couponDetails: defaultCouponData,
    cartItemDetails: defaultCartItemData,

    _setCouponData: (details) => {
        // setLocalStorage("couponData", details);

        set((state) => {
            return {
                couponData: [...state.couponData, ...details],
            };
        });
    },
  
    _setCouponDetails: (details) => {
        setLocalStorage("couponDetails", details);

        set((_state) => {
            return {
                couponDetails: details,
            };
        });
    },
  
    _restoreCouponDetails: () => {
        const couponDetails = getLocalStorage("couponDetails");
        // const releaseSongData = getLocalStorage("releaseSongData");

        set((_state) => {
            return {
                couponDetails: couponDetails ? couponDetails : defaultCouponData,
                // songDetails: releaseSongData ? releaseSongData : defaultSongData
            };
        });
    },

}));
  