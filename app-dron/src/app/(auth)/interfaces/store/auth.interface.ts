export interface UserAuth {
  id: number;
  nombre: string,
  apellido: string,
  role: string,
  username: string;
  token: string;
  email: string;
}

export interface Auth {
  user: UserAuth;
  login: (user: UserAuth) => void;
  logout: () => void;
}

