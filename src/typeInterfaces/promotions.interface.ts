export type promotionInterface = {
    _id: string;
    title: string;
    image: string;
    userType: "All" | "artist" | "record label";
    status: boolean;

    createdBy: {
        user_id: string;
        user_email: string;
        name: string;
    };

    createdAt: string;
    updatedAt: string;
};