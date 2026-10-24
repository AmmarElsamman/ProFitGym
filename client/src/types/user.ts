export type User = {
    id: string;
    displayName: string;
    token: string;
}


export type LoginCreds = {
    displayName: string;
    password: string;
}


export type RegisterCreds = {
    displayName: string;
    password: string;
    confirmPassword: string;
}

