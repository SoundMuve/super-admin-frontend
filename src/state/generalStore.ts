import { create } from "zustand";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { getLocalStorage } from "@/util/storage";
import { contactUsInterface, newsLetterInterface } from "@/typeInterfaces/contactInterface";
import { userInterface } from "@/typeInterfaces/users.interface";
import { liveReleasesInterface } from "@/hooks/analytics/useAnalyticsHook";
import { defaultReleaseData } from "./releaseStore";


const defaultContactData: contactUsInterface = {
    _id: "",
    name: "",
    email: "",
    message: "",
    reply: [],
    status: "Pending",
    createdAt: "",
    updatedAt: ""
};

const defaultNewsletterData: newsLetterInterface = {
    _id: "",
    title: "",
    message: "",
    recipients: [],
    failedRecipients: [],
    sentBy: {
        user_id: "",
        user_email: "",
        name: ""
    },
    createdAt: "",
    updatedAt: ""
};


const defaultUserData: userInterface = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    balance: 0,
    role: "user",
    userType: "artist",
    phoneNumber: "",
    country: "",
    status: false,
    location: {
        ip: "",
        usedIps: [],
        city: "",
        region: "",
        country: "",
        isp: "",
        lat: 0,
        lon: 0
    },
    createdAt: "",
    updatedAt: "",
    kyc: {
        isKycSubmitted: false,
        phoneNumber: "",
        securityQuestions: []
    }
};

const defaultAnalyticsData: liveReleasesInterface = {
    user: defaultUserData,
    lastUpdated: "",
    release: defaultReleaseData,
    totalAnalytics: {
        revenue: 0,
        streamRevenue: 0,
        streamPlay: 0,
        noSold: 0,
        albumSold: 0
    },
    lastAnalytics: {
        _id: "",
        user_id: "",
        user_email: "",
        release_id: "",
        song_id: "",
        date: "",
        albumSold: 0,
        noSold: 0,
        revenue: 0,
        streamRevenue: 0,
        streamPlay: 0,
        location: [],
        status: "Pending",
        createdAt: "",
        updatedAt: ""
    }
}

type _typeInterface_ = {
    contactDetails: contactUsInterface;
    _setContactDetails : (details: contactUsInterface) => void;

    newsLetterDetails: newsLetterInterface;
    _setNewsLetterDetails : (details: newsLetterInterface) => void;

    selectedUserDetails: userInterface;
    _setSelectedUserDetails : (details: userInterface) => void;

    selectedAnalyticsDetails: liveReleasesInterface;
    _setSelectedAnalyticsDetails : (details: liveReleasesInterface) => void;

    _restoreContactDetails : () => void;
    // updatePlayerAsync: () => Promise<void>;
};
  

export const useGeneralStore = create<_typeInterface_>((set) => ({
    contactDetails: defaultContactData,
    _setContactDetails: (details) => {
        // setLocalStorage("contactDetails", details);

        set((_state) => {
            return {
                contactDetails: details,
            };
        });
    },


    newsLetterDetails: defaultNewsletterData,
    _setNewsLetterDetails: (details) => {
        // setLocalStorage("contactDetails", details);

        set((_state) => {
            return {
                newsLetterDetails: details,
            };
        });
    },

    selectedUserDetails: defaultUserData,
    _setSelectedUserDetails: (details) => {
        // setLocalStorage("contactDetails", details);

        set((_state) => {
            return {
                selectedUserDetails: details,
            };
        });
    },

    selectedAnalyticsDetails: defaultAnalyticsData,
    _setSelectedAnalyticsDetails: (details) => {
        // setLocalStorage("contactDetails", details);

        set((_state) => {
            return {
                selectedAnalyticsDetails: details,
            };
        });
    },
  

    _restoreContactDetails: () => {
        const contactDetails = getLocalStorage("contactDetails");
        // const releaseSongData = getLocalStorage("releaseSongData");

        set((_state) => {
            return {
                contactDetails: contactDetails ? contactDetails : defaultContactData,
                // songDetails: releaseSongData ? releaseSongData : defaultSongData
            };
        });
    },

}));
  