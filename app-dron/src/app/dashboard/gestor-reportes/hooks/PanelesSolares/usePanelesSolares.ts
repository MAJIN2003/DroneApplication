"use client";

import { useState } from "react";
import {
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
  };
};

export default usePanelesSolares;
