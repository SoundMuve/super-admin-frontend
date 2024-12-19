export type artistInterface = {
    name: string,
    id: string,
    profilePicture: string,
    latestAlbum?: {
        name: string,
        releaseDate: string,
        externalUrl: string,
    }
}

export type songArtists_CreativesInterface = {
    name: string,
    role: string,
    artist?: artistInterface
}

export type songInterface = {
    _id: string,
    songAudio: any,
    songTitle: string, // not needed for singles or better still same as title for singles

    songWriters: string[],
    songArtists_Creatives: songArtists_CreativesInterface[]
    copyrightOwnership: {
        coverVersion: "Yes" | "No",
        permissions?: "Yes" | "No",
    },
    explicitLyrics: "Yes" | "No",

    isrcNumber: string,

    // language_of_lyrics: string,
    lyricsLanguage: string,
    lyrics?: string // optional

    tikTokClipStartTime?: {  // optional
        minutes: string,
        seconds: string,
    },
};


export type releaseInterface = {
    _id: string,
    user_id: string,
    email: string,
    recordLabelArtist_id?: string,
    releaseType: "single" | "album",

    title: string,

    mainArtist: {
        spotifyProfile: artistInterface,
        appleMusicProfile: any
    },

    language: string,
    primaryGenre: string,
    secondaryGenre: string,

    releaseDate: string,
    spotifyReleaseTime: {
        hours: string,
        minutes: string,
        am_pm: "AM" | "PM"
    };
    spotifyReleaseTimezone: string;

    labelName: string, // optional
    recordingLocation: string, // optional 

    soldCountries: {
        worldwide: "Yes" | "No",
        countries: string[] // optional if worldwide is No
    },

    upc_ean: string, // optional

    stores: string[],
    socialPlatforms: string[],

    // singleSong?: songInterface,
    // albumSongs?: songInterface[],
    songs: songInterface[],

    coverArt: string,

    // status: "Live" | "Pending" | "Incomplete" | "Complete" | "Failed",
    status: "Incomplete" | "Unpaid" | "Processing" |  "Complete" | "Live" | "Failed",
    liveUrl?: string,
    payment_id?: string,

    createdAt: string;
    updatedAt: string;
}



export type singleRelease1Interface = {
    release_id?: string,
    title: string,
    recordLabelArtist_id?: string,

    mainArtist: {
        spotifyProfile: artistInterface,
        appleMusicProfile: string
    },

    language: string,
    primaryGenre: string,
    secondaryGenre: string,

    releaseDate: string,
    spotifyReleaseTime: {
        hours: string,
        minutes: string,
        am_pm: string  // "AM" | "PM"
    },
    spotifyReleaseTimezone: string,

    labelName?: string, // optional
    recordingLocation?: string, // optional 

    soldCountries: {
        worldwide: string, // "Yes" | "No",
        countries?: string[], // optional if worldwide is Yes
    },

    upc_ean?: string // optional
}


export type singleRelease2Interface = {
    release_id: string,
    stores: string[],
    socialPlatforms: string[],
    singleSong: songInterface,
    coverArt: any,
}




export type albumRelease1Interface = {
    release_id?: string,
    recordLabelArtist_id?: string,

    title: string,

    mainArtist: {
        spotifyProfile: artistInterface,
        appleMusicProfile: string
    },

    language: string,
    primaryGenre: string,
    secondaryGenre: string,

    releaseDate: string,
    spotifyReleaseTime: {
        hours: string,
        minutes: string,
        am_pm: string  // "AM" | "PM"
    },
    spotifyReleaseTimezone: string
}


export type albumRelease2Interface = {
    release_id: string,

    labelName?: string, // optional
    recordingLocation?: string, // optional 

    soldCountries: {
        worldwide: string, // "Yes" | "No",
        countries?: string[], // optional if worldwide is Yes
    },

    upc_ean?: string // optional

}

export type albumRelease3Interface = {
    release_id: string,
    stores: string[],
    socialPlatforms: string[],
}
