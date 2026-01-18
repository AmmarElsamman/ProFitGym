export type Client = {
    id: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    status: ClientStatus;
    joinDate: string;
    subscriptionDate: string;
    expirationDate: string;
}

export enum ClientStatus {
    Active = 1,
    Inactive = 2,
    Freezed = 3
}

export type ClientRegisterInfo = {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    subscriptionDate: string;
    membershipDurationInMonths: number;
}
