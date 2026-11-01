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
    currentStatus: 'Active' | 'Expired' | 'Frozen' | 'Cancelled';
}

export enum ClientStatus {
    Active = 1,
    Cancelled = 2,
    Frozen = 3,
    Expired = 4
}

export type ClientRegisterInfo = {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    subscriptionDate?: string;
    membershipDurationInMonths: number;
}

export type ClientSearchResult = {
    id: string;
    fullName: string;
    phoneNumber: string;
    expirationDate: string;
    currentStatus: Client['currentStatus'];
}

export type EditableClientInfo = {
    fullName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    status: Number;
    subscriptionDate: string;
    expirationDate: string;
}
