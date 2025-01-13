export type currencyInterface = {
    currency_symbol: string,
    currency_name: string,
    currency_code: string,
}

export type payoutDetailsInterface = {
    _id: string;

    user_email: string,
    user_id: string,
    paymentMethod: string,

    currency: currencyInterface,
    account_number?: string,
    bank_name?: string,
    beneficiary_name?: string,

    bank?: {
        id: number,
        code: string,
        name: string,
    },
    
    beneficiary_email?: string,

    routing_number?: string,
    swift_code?: string,

    beneficiary_address?: string,
    beneficiary_country?: string,

    postal_code?: string,
    street_number?: string,
    street_name?: string,
    city?: string,
    destination_branch_code?: string,

    // debit_currency?: string,

    createdAt?: string;
    updatedAt?: string;
};

export type savePayoutDetailsInterface = {
    // _id: string;

    // user_email: string,
    // user_id: string,
    paymentMethod: string,

    currency: currencyInterface,
    account_number?: string,
    bank_name?: string,
    beneficiary_name?: string,

    beneficiary_email?: string,

    routing_number?: string,
    swift_code?: string,

    beneficiary_address?: string,
    beneficiary_country?: string,

    postal_code?: string,
    street_number?: string,
    street_name?: string,
    city?: string,
    destination_branch_code?: string,
};