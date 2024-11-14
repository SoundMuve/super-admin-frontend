export interface cartItemInterface {
    _id: string,
    release_id: string,
    user_email: string,
    user_id: string,
    artistName: string,
    coverArt: string,
    price: number,
    releaseType: string,
    title: string,

    createdAt?: string;
    updatedAt?: string;
}



export interface couponInterface {
    _id: string,
    cartItems: cartItemInterface[],
    user_id: string,
    user_name: string,
    user_email: string,

    youtubeLink: string,
    instagramFacebookLink: string,
    xLink: string,
    code?: string,
    discount?: number,
    discountedAmount?: number,
    payableAmount?: number,

    status: "Pending" | "Rejected" | "Approved" | "Used",

    usedDate?: string;

    createdAt: string;
    updatedAt?: string;
}