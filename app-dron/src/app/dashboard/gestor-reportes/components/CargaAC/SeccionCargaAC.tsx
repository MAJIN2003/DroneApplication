import DroneMap from "@/shared/components/DronMap/DronMap";
import useCargaAC from "../../hooks/CargaAC/useCargaAC";
import DeviseChart from "../DeviseChart";
import AreaChart from "../AreaChart";
import { use, useEffect } from "react";
import Combobox from "@/shared/components/combobox/Combobox";
import FormSearch from "../FormSearch";
import DataRange from "../DataRange";
import { FindReportsRequest } from "../../interfaces/findReports/paneles-solares.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useDateRange from "../../hooks/useDateRange";
import useFilter from "../../hooks/useFilter";
import TableCargaAC from "./TableCargaAC";

const SeccionCargaAC = () => {
  const {
    handlerFindReportsByDaysCargaAC,
    handlerFindReportsCurrentCargaAC,
    handlerFindReportsDayCargaAC,
    handlerFindReportsMonthCargaAC,
    handlerFindReportsWeekCargaAC,
    reportsCargaAC,
    loadingCargaAC,
    handlerResetReportsCargaAC,
    corriente,
    labels,
    potencia,
    rangoFecha,
  } = useCargaAC();

  const {
    filterDate,
    handleChangeDate,
    optionsFilterDate,
    filterDrone,
    handleChangeDrone,
    optionsDrones,
  } = useFilter({ handlerResetReports: handlerResetReportsCargaAC });

  useEffect(() => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentCargaAC(+filterDrone);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekCargaAC(+filterDrone);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthCargaAC(+filterDrone);
    }
  }, [filterDate, filterDrone]);

  const initialForm: FindReportsRequest = {
    fecha: "",
    time1: "",
    time2: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FindReportsRequest>({ defaultValues: initialForm });

  const onSubmit: SubmitHandler<FindReportsRequest> = (data) => {
    if (+filterDrone === 0) return toast.error("Seleccione un dron");
    handlerFindReportsDayCargaAC(data, +filterDrone);
  };

  const handleReset = () => {
    handlerResetReportsCargaAC();
    reset(initialForm);
  };

  const { date, setDate, fechaRequest } = useDateRange({
    idDrone: +filterDrone,
    handlerFindReportsByDays: handlerFindReportsByDaysCargaAC,
    handlerResetReports: handlerResetReportsCargaAC,
  });

  const onPagination = (page: number) => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentCargaAC(+filterDrone, page);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekCargaAC(+filterDrone, page);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthCargaAC(+filterDrone, page);
    }
    if (filterDate === "personalizado") {
      handlerFindReportsByDaysCargaAC(fechaRequest, +filterDrone, page);
    }
    if (filterDate === "diario") {
      handlerFindReportsDayCargaAC(watch(), +filterDrone, page);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center gap-2 md:gap-6 ">
        <Combobox
          label="Filtrar por:"
          options={optionsFilterDate}
          onChange={handleChangeDate}
          value={filterDate}
        />

        <Combobox
          label="Dron:"
          options={optionsDrones}
          onChange={handleChangeDrone}
          value={filterDrone}
        />
      </div>
      {filterDate === "diario" && (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap justify-center items-center gap-2 md:gap-6">
          <FormSearch
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            onSubmit={onSubmit}
            handleReset={handleReset}
          />
        </div>
      )}
      {filterDate === "personalizado" && (
        <DataRange date={date} setDate={setDate} />
      )}
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <TableCargaAC uvs={reportsCargaAC} onPagination={onPagination} />
        </div>
        <div className="md:w-1/2 w-full gap-4 flex flex-col">
          <div className="cargaAC bg-white p-4 rounded-lg shadow-lg">
            <div>
              <DeviseChart
                c={corriente}
                v={potencia}
                labelsDevise={labels}
                title={`Estación de carga AC ${rangoFecha}`}
                label1="Corriente"
                label2="Potencia"
                height={160}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeccionCargaAC;
