
type securityQuestionsInterface = {
    question: string,
    answer: string
};


export type locationInterface = {
    ip: string,
    usedIps: string[],
    city: string,
    region: string,
    country: string,
    isp: string,
    lat: number,
    lon: number,
};

export type userInterface = {
    _id?: string;
    role: 'user' | 'admin',
    userType: 'artist' | 'record label',
    balance: number,
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string,
    gender?: string;

    artistName?: string;
    recordLabelName?: string;
    recordLabelLogo?: string;

    kyc: {
        isKycSubmitted: boolean,
        phoneNumber: string,
        securityQuestions: securityQuestionsInterface[]
    }

    password: string;
    status: boolean;
    // lastUsedIp: string;

    location: locationInterface,

    createdAt?: string;
    updatedAt?: string;
};
