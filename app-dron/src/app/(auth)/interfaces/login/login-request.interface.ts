export interface LoginRequest {
    user: User;
}

export interface User {
    email:    string;
    password: string;
}