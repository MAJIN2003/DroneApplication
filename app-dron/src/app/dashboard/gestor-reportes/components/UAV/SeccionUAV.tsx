import DroneMap from "@/shared/components/DronMap/DronMap";
import useUAV from "../../hooks/UAV/useUAV";
import TableUAV from "./TableUAV";
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
import BateryChart from "../BateryChart";

const SeccionUAV = () => {
  const {
    handlerFindReportsCurrentUAV,
    handlerFindReportsDayUAV,
    handlerFindReportsMonthUAV,
    handlerFindReportsWeekUAV,
    handlerResetReportsUAV,
    reportsUAV,
    handlerFindReportsByDaysUAV,
    corriente,
    voltaje,
    promedioPorcentajeBateria,
    porcentajeBateria,
    labels,
    loadingUAV,
    rangoFecha,
  } = useUAV();

  const {
    filterDate,
    handleChangeDate,
    optionsFilterDate,
    filterDrone,
    handleChangeDrone,
    optionsDrones,
  } = useFilter({ handlerResetReports: handlerResetReportsUAV });

  useEffect(() => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentUAV(+filterDrone);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekUAV(+filterDrone);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthUAV(+filterDrone);
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
    handlerFindReportsDayUAV(data, +filterDrone);
  };

  const handleReset = () => {
    handlerResetReportsUAV();
    reset(initialForm);
  };

  const { date, setDate, fechaRequest } = useDateRange({
    idDrone: +filterDrone,
    handlerFindReportsByDays: handlerFindReportsByDaysUAV,
    handlerResetReports: handlerResetReportsUAV,
  });

  const onPagination = (page: number) => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentUAV(+filterDrone, page);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekUAV(+filterDrone, page);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthUAV(+filterDrone, page);
    }
    if (filterDate === "personalizado") {
      handlerFindReportsByDaysUAV(fechaRequest, +filterDrone, page);
    }
    if (filterDate === "diario") {
      handlerFindReportsDayUAV(watch(), +filterDrone, page);
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

        {/* <button className="btn-primary" onClick={() => generatePDF()}>
            Imprimir reporte
          </button> */}
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
        <div className="md:w-2/3 w-full h-full bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">

          <TableUAV uvs={reportsUAV} onPagination={onPagination} />
          <div className="w-full min-h-80 h-full">
            <DroneMap uavResponses={reportsUAV} loadingData={loadingUAV} />
          </div>
        </div>
        <div className="md:w-1/3 w-full gap-4 flex flex-col">
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div>
              <DeviseChart
                c={corriente}
                v={voltaje}
                labelsDevise={labels}
                title={`UAV ${rangoFecha}`}
                label1="Corriente"
                label2="Voltaje"
                height={250}
              />
            </div>
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div className="w-full h-full">
              <AreaChart
                labelsDevise={labels}
                textLabel="Porcentaje de bateria"
                title={`UAV bateria/tiempo ${rangoFecha}`}
                values={porcentajeBateria}
              />
            </div>
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className="w-full min-h-fit">
              <h2 className="text-sm text-center font-medium text-gray-800 ">
                Promedio porcentaje de bateria
              </h2>
              <BateryChart
                batteryLevel={promedioPorcentajeBateria}
                width={250}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeccionUAV;
