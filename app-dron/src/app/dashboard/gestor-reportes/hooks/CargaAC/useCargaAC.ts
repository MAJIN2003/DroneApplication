"use client";

import { useState } from "react";
import { EstacionCargaACResponse } from "../../interfaces/findReports/estacion-carga-ac.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../../services/carga-ac";
import { toast } from "react-toastify";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../../interfaces/findReports/paneles-solares.interface";
import obtenerRangoFecha from "@/shared/utils/RangoFecha";
import LabelsFecha from "@/shared/utils/LabelsFecha";

const initialState: EstacionCargaACResponse = {
  data: [],
  pagination: { count: 0, page: 0, items: 0, pages: 0, next: 0, prev: 0 },
};

const useCargaAC = () => {
  const [reportsCargaAC, setReportsCargaAC] =
    useState<EstacionCargaACResponse>(initialState);
  const [loadingCargaAC, setLoadingCargaAC] = useState<boolean>(false);

  const handlerFindReportsDayCargaAC = async (
    request: FindReportsRequest,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaAC(true);
    try {
      const promise = findReportsDay(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaAC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaAC(false);
    }
  };

  const handlerFindReportsMonthCargaAC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaAC(true);
    try {
      const promise = findReportsMonth(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaAC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaAC(false);
    }
  };

  const handlerFindReportsWeekCargaAC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaAC(true);
    try {
      const promise = findReportsWeek(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaAC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaAC(false);
    }
  };

  const handlerFindReportsCurrentCargaAC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaAC(true);
    try {
      const promise = findReportsCurrent(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaAC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaAC(false);
    }
  };

  const handlerFindReportsByDaysCargaAC = async (
    request: FindReportsRequestDays,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaAC(true);
    try {
      const promise = findByDays(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaAC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaAC(false);
    }
  };

  const handlerResetReportsCargaAC = () => {
    setReportsCargaAC(initialState);
  };

  const rangoFecha = obtenerRangoFecha(
    reportsCargaAC.data.map((item) => item.fecha_registro)
  );

  const corriente = reportsCargaAC.data.map((item) => item.corrienteAC);
  const potencia = reportsCargaAC.data.map((item) => item.potenciaAC);

  const labels = LabelsFecha(
    reportsCargaAC.data.map((item) => item.fecha_registro)
  );

  return {
    reportsCargaAC,
    loadingCargaAC,
    handlerFindReportsDayCargaAC,
    handlerFindReportsMonthCargaAC,
    handlerFindReportsWeekCargaAC,
    handlerFindReportsCurrentCargaAC,
    handlerFindReportsByDaysCargaAC,
    handlerResetReportsCargaAC,
    rangoFecha,
    corriente,
    potencia,
    labels,
  };
};

export default useCargaAC;
