import droneApi from "@/config/apiRoute";
import {
  FindReportsRequest,
  FindReportsRequestDays,
  FindReportsResponse,
} from "../interfaces/findReports/paneles-solares.interface";

const BASE_URL = "/solar_panels";

export const findReportsDay = async (
  request: FindReportsRequest,
  idDrone: number,
  page: number = 1
): Promise<FindReportsResponse> => {
  try {
    const { fecha, time1, time2 } = request;

    if (time1.length === 0 || time2.length === 0) {
      const response = await droneApi.get<FindReportsResponse>(
        `${BASE_URL}/filter_by_day/${idDrone}?date=${fecha}`
      );
      const dataResponse = response.data;

      return dataResponse;
    }

    console.log("time1", time1);
    console.log("time2", time2);

    const response = await droneApi.get<FindReportsResponse>(
      `${BASE_URL}/filter_by_day/${idDrone}?date=${fecha}&start_time=${time1}&end_time=${time2}&page=${page}`
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
): Promise<FindReportsResponse> => {
  try {
    const response = await droneApi.get<FindReportsResponse>(
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
): Promise<FindReportsResponse> => {
  try {
    const response = await droneApi.get<FindReportsResponse>(
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
): Promise<FindReportsResponse> => {
  try {
    const response = await droneApi.get<FindReportsResponse>(
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
): Promise<FindReportsResponse> => {
  try {
    const response = await droneApi.get<FindReportsResponse>(
      `${BASE_URL}/personalized_info/${idDrone}?start_date=${fecha1}&end_date=${fecha2}&page=${page}`
    );
    const dataResponse = response.data;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
