import { analyticsInterface } from "./analytics.interface";
import { cartItemInterface } from "./cartInterface";
import { payoutDetailsInterface } from "./payout.interface";
import { releaseInterface } from "./release.interface";
import { userInterface } from "./users.interface";

export type transactionInterface = {
    _id: string;
    
    user_id: string;
    user_email: string;

    transactionType: "Withdrawal" | "Credit" | "Debit" | "Payment";

    description: string;
    amount: number;

    
    credit?: {
        analytics_id: string;
        release_id: string;
        // revenue: string;
    }

    withdrawal?: {
        payout_id: string;

        narration: string;

        paymentMethod: string;
        currency: string;
        accountNumber: string;
        beneficiaryName: string;
        bankName: string;
        beneficiaryEmail: string;
    };

    payment?: {
        cartItems: cartItemInterface[],
        paidAmount: number,
        totalAmount: number,
        paymentIntent: string;
        paymentIntentClientSecret: string;
        paymentStatus: string;
        currency: string;
    },

    metaData?: {
        status: string,
        message: string,
        data: any,
    };
    
    status: "Pending" | "Processing" | "Success" | "Complete" | "Failed",

    createdAt: string;
    updatedAt: string;
}


interface temptUserInterface {
    userType: "artist" | "record label";
    balance: number;
    email: string;
    firstName: string;
    lastName: string;
    artistName?: string;
    recordLabelName?: string;
}

export type revenueTransactionInterface = transactionInterface & temptUserInterface;


export interface topTotalTransactionAnalysisInterface {
    totalUsers: {
        totalUsers: number;
        totalArtist: number;
        totalRl: number;
    };
    totalBalance: number;
    totalUsersBalance: number;
    totalPaidoutAmount: number;
}




export interface transactionRevenueDetailsInterface {
    transaction: transactionInterface,
    user: userInterface,

    release: releaseInterface,
    analytics: analyticsInterface,
    
    payout: payoutDetailsInterface,
}