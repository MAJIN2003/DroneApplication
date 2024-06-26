import droneApi from "@/config/apiRoute";
import { LoginRequest } from "../interfaces/login/login-request.interface";
import {
  LoginResponse,
  Status,
} from "../interfaces/login/login-response.interface";
import { RegisterRequest } from "../interfaces/register/register-request.interface";
import { RegisterResponse } from "../interfaces/register/register-response.interface";

export const login = async (user: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await droneApi.post("/auth/login", user);
    const token = response.headers.authorization
    const dataResponse = response.data as LoginResponse;

    return {
      status: {
        ...dataResponse.status,
        data: {
          user: {
            ...dataResponse.status.data.user,
            token,
          },
        },
      },
    } as LoginResponse;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  user: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await droneApi.post("/auth/signup", user);
    const token = response.headers.authorization;
    const dataResponse = response.data as RegisterResponse;
    return {
      status: {
        ...dataResponse.status,
        data: {
          ...dataResponse.status.data,
          token,
        },
      },
    } as RegisterResponse;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await droneApi.delete("/auth/logout", {});
  } catch (error) {
    throw error;
  }
};
