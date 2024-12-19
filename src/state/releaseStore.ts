import { create } from "zustand";
import temptCoverPhotoImg from '@/assets/images/sampleArtWork.png';
import { releaseInterface, songInterface } from "@/typeInterfaces/release.interface";
import { getLocalStorage } from "@/util/storage";


export const defaultReleaseData: releaseInterface = {
    user_id: "",
    email: "",
    releaseType: "single",
    title: "",
    mainArtist: {
        spotifyProfile: {
            name: "",
            id: "",
            profilePicture: "",
            latestAlbum: undefined
        },
        appleMusicProfile: undefined
    },
    language: "",
    primaryGenre: "",
    secondaryGenre: "",
    releaseDate: "",
    spotifyReleaseTime: {
        hours: "",
        minutes: "",
        am_pm: "AM"
    },
    spotifyReleaseTimezone: "",
    labelName: "",
    recordingLocation: "",
    soldCountries: {
        worldwide: "Yes",
        countries: []
    },
    upc_ean: "",
    stores: [],
    socialPlatforms: [],
    coverArt: temptCoverPhotoImg,
    status: "Incomplete",
    _id: "",
    songs: [],
    createdAt: "",
    updatedAt: ""
};


const defaultSongData: songInterface = {
    songAudio: undefined,
    songTitle: "",
    songWriters: [],
    songArtists_Creatives: [],
    copyrightOwnership: {
        coverVersion: "Yes",
        permissions: undefined
    },
    explicitLyrics: "Yes",
    isrcNumber: "",
    lyricsLanguage: "",
    _id: ""
}




type _typeInterface_ = {
    releaseDetails: releaseInterface;
    songDetails: songInterface;

    _setSongDetails : (details: songInterface) => void;
    _setReleaseDetails : (details: releaseInterface) => void;
    _restoreReleaseDetails : () => void;

    // updatePlayerAsync: () => Promise<void>;
};
  

export const useReleaseStore = create<_typeInterface_>((set) => ({
    releaseDetails: defaultReleaseData,
    songDetails: defaultSongData,
  
    _setSongDetails: (details) => {
        // setLocalStorage("releaseSongData", details);

        set((_state) => {
            return {
                songDetails: details,
            };
        });
    },
  
    _setReleaseDetails: (details) => {
        // setLocalStorage("releaseData", details);

        set((_state) => {
            return {
                releaseDetails: details,
            };
        });
    },
  
    _restoreReleaseDetails: () => {
        const releaseData = getLocalStorage("releaseData");
        const releaseSongData = getLocalStorage("releaseSongData");

        set((_state) => {
            return {
                releaseDetails: releaseData ? releaseData : defaultReleaseData,
                songDetails: releaseSongData ? releaseSongData : defaultSongData
            };
        });
    },

}));
  