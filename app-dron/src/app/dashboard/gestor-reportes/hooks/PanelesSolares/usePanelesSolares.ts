"use client";

import { useState } from "react";
import {
  AveragedReport,
  FindReportsRequest,
  FindReportsResponse,
} from "../../interfaces/findReports/paneles-solares.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../../services/paneles-solares";
import { toast } from "react-toastify";
import { FindReportsRequestDays } from "../../interfaces/findReports/paneles-solares.interface";
import obtenerRangoFecha from "@/shared/utils/RangoFecha";
import LabelsFecha from "@/shared/utils/LabelsFecha";
import moment from "moment";

const intialState: FindReportsResponse = {
  data: [],
  pagination: { count: 0, page: 0, items: 0, pages: 0, next: 0, prev: 0 },
};
const usePanelesSolares = () => {
  const [reports, setReports] = useState<FindReportsResponse>(intialState);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerFindReportsDay = async (
    request: FindReportsRequest,
    idDrone: number,
    page: number = 1
  ) => {
    setLoading(true);
    try {
      const response = findReportsDay(request, idDrone, page);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsMonth = async (idDrone: number, page: number = 1) => {
    setLoading(true);
    try {
      const response = findReportsMonth(idDrone, page);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsWeek = async (idDrone: number, page: number = 1) => {
    setLoading(true);
    try {
      const response = findReportsWeek(idDrone, page);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsCurrent = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoading(true);
    try {
      const response = findReportsCurrent(idDrone, page);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsByDays = async (
    request: FindReportsRequestDays,
    idDrone: number,
    page: number = 1
  ) => {
    setLoading(true);
    try {
      const response = findByDays(request, idDrone, page);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerResetReports = () => {
    setReports(intialState);
  };

  const labels = LabelsFecha(
    reports.data.map((item) => item.fecha_registro)
  );

  const rangoFecha = obtenerRangoFecha(reports.data.map((item) => item.fecha_registro));

  const averageReportsByHour = (): AveragedReport[] => {
    const hourlyData: { [hour: string]: { count: number, Cp: number, Vp: number, Cb: number, Vb: number, Cc: number, Vc: number } } = {};
  
    // Acumular valores por hora
    reports.data.forEach((report) => {
      const hour = moment.utc(report.fecha_registro).format("HH:00");
      if (!hourlyData[hour]) {
        hourlyData[hour] = { count: 0, Cp: 0, Vp: 0, Cb: 0, Vb: 0, Cc: 0, Vc: 0 };
      }
      hourlyData[hour].count++;
      hourlyData[hour].Cp += report.Cp;
      hourlyData[hour].Vp += report.Vp;
      hourlyData[hour].Cb += report.Cb;
      hourlyData[hour].Vb += report.Vb;
      hourlyData[hour].Cc += report.Cc;
      hourlyData[hour].Vc += report.Vc;
    });
  
    // Calcular promedios
    const averagedReports: AveragedReport[] = Object.keys(hourlyData).map((hour) => {
      const data = hourlyData[hour];
      return {
        hour,
        Cp: data.Cp / data.count,
        Vp: data.Vp / data.count,
        Cb: data.Cb / data.count,
        Vb: data.Vb / data.count,
        Cc: data.Cc / data.count,
        Vc: data.Vc / data.count
      };
    });
  
    return averagedReports;
  };

  return {
    reports,
    loading,
    handlerFindReportsDay,
    handlerFindReportsMonth,
    handlerFindReportsWeek,
    handlerFindReportsCurrent,
    handlerResetReports,
    handlerFindReportsByDays,
    rangoFecha,
    labels,
    averageReportsByHour
  };
};

export default usePanelesSolares;
