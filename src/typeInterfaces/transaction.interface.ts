export type transactionInterface = {
    _id: string;
    
    user_id: string;
    user_email: string;

    transactionType: "Withdrawal" | "Credit" | "Debit";

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

    status: "Pending" | "Processing" | "Success" | "Complete" | "Failed",

    createdAt: string;
    updatedAt: string;
}
