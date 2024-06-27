import droneApi from "@/config/apiRoute";
import { EstacionCargaDCResponse } from "../interfaces/findReports/estacion-carga-dc.interface";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../interfaces/findReports/paneles-solares.interface";

const BASE_URL = "/estacion_carga_dcs";

//falta implementar
export const findReportsDay = async (
  request: FindReportsRequest,
  idDrone: number,
  page: number = 1
): Promise<EstacionCargaDCResponse> => {
  try {
    const { fecha, time1, time2 } = request;

    const response = await droneApi.get(
      `${BASE_URL}/filter_by_day/${idDrone}?date=${fecha}&start_time=${time1}&end_time=${time2}&page=${page}`
    );
    const dataResponse = response.data as EstacionCargaDCResponse;

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsMonth = async (
  idDrone: number,
  page: number = 1
): Promise<EstacionCargaDCResponse> => {
  try {
    const response = await droneApi.get<EstacionCargaDCResponse>(
      `${BASE_URL}/filter_by_month/${idDrone}?page=${page}`
    );

    const dataResponse = response.data;

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsWeek = async (
  idDrone: number,
  page: number = 1
): Promise<EstacionCargaDCResponse> => {
  try {
    const response = await droneApi.get<EstacionCargaDCResponse>(
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
): Promise<EstacionCargaDCResponse> => {
  try {
    const response = await droneApi.get<EstacionCargaDCResponse>(
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
): Promise<EstacionCargaDCResponse> => {
  try {
    const response = await droneApi.get<EstacionCargaDCResponse>(
      `${BASE_URL}/personalized_info/${idDrone}?start_date=${fecha1}&end_date=${fecha2}&page=${page}`
    );
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
