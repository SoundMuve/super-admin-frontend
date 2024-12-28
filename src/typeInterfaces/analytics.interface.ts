export type locationAnalyticsInterface = {
    country: string,
    albumSold: number,
    noSold: number,
    streamRevenue: number,
    streamPlay: number,
    revenue: number,
}

export type analyticsInterface = {
    _id: string,
    
    user_id: string,
    user_email: string,

    release_id: string,
    song_id: string,
    date: string, // month and year
    
    albumSold: number,
    noSold: number,
    revenue: number,
    streamRevenue: number,
    streamPlay: number,

    location: locationAnalyticsInterface[],

    status: "Pending" | "Processing" | "Success" | "Complete" | "Failed",

    createdAt: string;
    updatedAt: string;
}


export type totalAnalyticsInterface = {
    revenue: number;
    streamRevenue: number;
    streamPlay: number;
    noSold: number;
    albumSold: number;
}