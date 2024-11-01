import { create } from "zustand";
import temptCoverPhotoImg from '@/assets/images/album.png';
import { releaseInterface, songInterface } from "@/typeInterfaces/release.interface";
// import { releaseInterface } from "@/constants/typesInterface";



const defaultReleaseData: releaseInterface = {
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
    status: "Incomplete"
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
    lyricsLanguage: ""
}




type _typeInterface_ = {
    releaseDetails: releaseInterface;
    songDetails: songInterface;

    _setSongDetails : (details: songInterface) => void;
    _setReleaseDetails : (details: releaseInterface) => void;

    // updatePlayerAsync: () => Promise<void>;
};
  

export const useReleaseStore = create<_typeInterface_>((set) => ({
    releaseDetails: defaultReleaseData,
    songDetails: defaultSongData,
  
    _setSongDetails: (details) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                songDetails: details,
            };
        });
    },
  
    _setReleaseDetails: (details) => {
        // setLocalStorage("user", user);

        set((_state) => {
            return {
                releaseDetails: details,
            };
        });
    },

}));
  