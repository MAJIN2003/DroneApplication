import droneApi from "@/config/apiRoute";
import { UserResponse } from "../interfaces/user.interface";

const URL_BASE = "/users";

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await droneApi.get<UserResponse[]>(URL_BASE);
    return response.data;
  } catch (error) {
    throw error;
  }
};
