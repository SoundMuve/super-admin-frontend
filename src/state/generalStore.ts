import { create } from "zustand";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { getLocalStorage } from "@/util/storage";
import { contactUsInterface, newsLetterInterface } from "@/typeInterfaces/contactInterface";
import { userInterface } from "@/typeInterfaces/users.interface";


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

type _typeInterface_ = {
    contactDetails: contactUsInterface;
    _setContactDetails : (details: contactUsInterface) => void;

    newsLetterDetails: newsLetterInterface;
    _setNewsLetterDetails : (details: newsLetterInterface) => void;

    selectedUserDetails: userInterface;
    _setSelectedUserDetails : (details: userInterface) => void;

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
  