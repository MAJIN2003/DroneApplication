import droneApi from "@/config/apiRoute";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../interfaces/findReports/paneles-solares.interface";
import { UAVResponse } from "../interfaces/findReports/uav.interface";

const BASE_URL = "/datos_uavs";

//falta implementar
export const findReportsDay = async (
  request: FindReportsRequest,
  idDrone: number,
  page: number = 1
): Promise<UAVResponse> => {
  try {
    const { fecha, time1, time2 } = request;

    const response = await droneApi.get<UAVResponse>(
      `${BASE_URL}/filter_by_day/${idDrone}?date=${fecha}?start_time=${time1}&end_time=${time2}&page=${page}`
    );
    const dataResponse = response.data;

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsMonth = async (
  idDrone: number,
  page: number = 1
): Promise<UAVResponse> => {
  try {
    const response = await droneApi.get<UAVResponse>(
      `${BASE_URL}/filter_by_month/${idDrone}?page=${page}`
    );

    console.log(response);

    const dataResponse = response.data;

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsWeek = async (
  idDrone: number,
  page: number = 1
): Promise<UAVResponse> => {
  try {
    const response = await droneApi.get<UAVResponse>(
      `${BASE_URL}/filter_by_week/${idDrone}?page=${page}`
    );
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsCurrent = async (
  idDrone: number,
  page: number = 1
): Promise<UAVResponse> => {
  try {
    const response = await droneApi.get<UAVResponse>(
      `${BASE_URL}/current/${idDrone}?page=${page}`
    );
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findByDays = async (
  { fecha1, fecha2 }: FindReportsRequestDays,
  idDrone: number,
  page: number = 1
): Promise<UAVResponse> => {
  try {
    const response = await droneApi.get<UAVResponse>(
      `${BASE_URL}/personalized_info/${idDrone}?start_date=${fecha1}&end_date=${fecha2}&page=${page}`
    );
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
