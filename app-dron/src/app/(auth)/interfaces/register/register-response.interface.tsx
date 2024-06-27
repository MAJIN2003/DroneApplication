export interface RegisterResponse {
    status: Status;
}

export interface Status {
    code:    number;
    message: string;
    data:    Data;
}

export interface Data {
    id:       number;
    username: string;
    email:    string;
    role:     string;
    nombre:   string;
    apellido: string;
    jti:      string;
    token:     string;
}
