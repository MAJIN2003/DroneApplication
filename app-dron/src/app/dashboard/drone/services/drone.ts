import droneApi from "@/config/apiRoute";
import { Dron, Drones, DronForm } from "../interfaces/drones.interface";

const BASE_URL = "/uavs";

export const getAll = async (page: number = 1): Promise<Drones> => {
  try {
    const response = await droneApi.get<Drones>(`${BASE_URL}?page=${page}`);
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const create = async (request: DronForm): Promise<Drones> => {
  try {
    const response = await droneApi.post<Drones>(`${BASE_URL}`, request);
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const update = async (
  request: DronForm,
  id: number
): Promise<Drones> => {
  try {
    const response = await droneApi.put<Drones>(`${BASE_URL}/${id}`, request);
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number): Promise<Drones> => {
  try {
    const response = await droneApi.delete<Drones>(`${BASE_URL}/${id}`);
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
