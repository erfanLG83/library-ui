export type UserInfo = {
    id: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    role: UserRole;
};

export enum UserRole {
    customer,
    superAdmin
}

export type SendOtpCodeResponse = {
    otpCodeTtl: string;
    isNewUser: boolean;
}

export type verifyOtpCodeRequest = {
    phoneNumber: string;
    otpCode: string;
    firstName: string | null;
    lastName: string | null;
}