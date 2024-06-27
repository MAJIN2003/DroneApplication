import { useState } from "react";
import { EstacionCargaDCResponse } from "../../interfaces/findReports/estacion-carga-dc.interface";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../../interfaces/findReports/paneles-solares.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../../services/carga-dc";
import { toast } from "react-toastify";
import obtenerRangoFecha from "@/shared/utils/RangoFecha";
import LabelsFecha from "@/shared/utils/LabelsFecha";

const initialState: EstacionCargaDCResponse = {
  data: [],
  pagination: { count: 0, page: 0, items: 0, pages: 0, next: 0, prev: 0 },
};

const useCargaDC = () => {
  const [reportsCargaDC, setReportsCargaDC] =
    useState<EstacionCargaDCResponse>(initialState);
  const [loadingCargaDC, setLoadingCargaDC] = useState<boolean>(false);

  const handlerFindReportsDayCargaDC = async (
    request: FindReportsRequest,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaDC(true);
    try {
      const promise = findReportsDay(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaDC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaDC(false);
    }
  };

  const handlerFindReportsMonthCargaDC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaDC(true);
    try {
      const promise = findReportsMonth(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaDC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaDC(false);
    }
  };

  const handlerFindReportsWeekCargaDC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaDC(true);
    try {
      const promise = findReportsWeek(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaDC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaDC(false);
    }
  };

  const handlerFindReportsCurrentCargaDC = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaDC(true);
    try {
      const promise = findReportsCurrent(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaDC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaDC(false);
    }
  };

  const handlerFindReportsByDaysCargaDC = async (
    request: FindReportsRequestDays,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingCargaDC(true);
    try {
      const promise = findByDays(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsCargaDC(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCargaDC(false);
    }
  };

  const handlerResetReportsCargaDC = () => {
    setReportsCargaDC(initialState);
  };

  const rangoFecha = obtenerRangoFecha(
    reportsCargaDC.data.map((item) => item.fecha_registro)
  );
  const labels = LabelsFecha(
    reportsCargaDC.data.map((item) => item.fecha_registro)
  );

  const corriente = reportsCargaDC.data.map((item) => item.corrienteDC);
  const potencia = reportsCargaDC.data.map((item) => item.potenciaDC);

  return {
    reportsCargaDC,
    loadingCargaDC,
    handlerFindReportsDayCargaDC,
    handlerFindReportsMonthCargaDC,
    handlerFindReportsWeekCargaDC,
    handlerFindReportsCurrentCargaDC,
    handlerFindReportsByDaysCargaDC,
    handlerResetReportsCargaDC,
    rangoFecha,
    corriente,
    potencia,
    labels,
  };
};

export default useCargaDC;
