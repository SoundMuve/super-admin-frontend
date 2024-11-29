export type contactUsInterface = {
    _id: string;
    name: string;
    email: string;
    message: string;

    reply: contactReplyInterface[];

    status: "Pending" | "Seen" | "Replied";

    createdAt: string;
    updatedAt: string;
};

type contactReplyInterface = {
    user_id: string;
    user_email: string;
    name: string;
    // replyTo?: string;
    message: string;
    date: string;
}



export type newsLetterInterface = {
    _id: string;

    title: string;
    message: string;
    recipients: string[];
    failedRecipients: string[];

    sentBy: {
        user_id: string;
        user_email: string;
        name: string;
    }

    createdAt: string;
    updatedAt: string;
}

export type newsLetterSubscribersInterface = {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
