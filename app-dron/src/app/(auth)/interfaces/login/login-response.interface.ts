export interface LoginResponse {
    status: Status;
}

export interface Status {
    code:    number;
    message: string;
    data:    Data;
}

export interface Data {
    user: User;
}

export interface User {
    id:       number;
    username: string;
    email:    string;
    nombre:   string;
    apellido: string;
    role:     string;
    token:    string;
}
