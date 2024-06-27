import { DateValue, RangeValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FindReportsRequestDays } from "../interfaces/findReports/paneles-solares.interface";
import { toast } from "react-toastify";

interface DateRangeProps {
  idDrone: number;
  idVuelo?: number;
  handlerFindReportsByDays: (
    request: FindReportsRequestDays,
    idDrone: number,
    idVuelo?: number
  ) => void;
  handlerResetReports: () => void;
}

const useDateRange = ({
  handlerFindReportsByDays,
  handlerResetReports,
  idDrone,
  idVuelo,
}: DateRangeProps) => {
  const [date, setDate] = useState<RangeValue<DateValue> | null>(null);
  const [fechaRequest, setFechaRequest] = useState<FindReportsRequestDays>({
    fecha1: "",
    fecha2: "",
  });

  useEffect(() => {
    onSubmit();
  }, [date, idDrone, idVuelo]);

  const onSubmit = () => {
    if (date) {
      const { start, end } = date;

      if (start === null || end === null) return;
      if (start.year > end.year) return;
      if (start.month > end.month) return;
      if (start.day > end.day) return;

      const request: FindReportsRequestDays = {
        fecha1: `${start.year}-${start.month}-${start.day}`,
        fecha2: `${end.year}-${end.month}-${end.day}`,
      };

      setFechaRequest(request);

      if (idDrone === 0) return toast.error("Seleccione un dron");

      if (idVuelo) {
        handlerFindReportsByDays(request, idDrone, idVuelo);
      } else {
        handlerFindReportsByDays(request, idDrone);
      }
    } else {
      handlerResetReports();
    }
  };

  return {
    date,
    setDate,
    fechaRequest,
  };
};

export default useDateRange;
