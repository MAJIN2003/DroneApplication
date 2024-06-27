"use client";

import { useEffect } from "react";
import usePanelesSolares from "../../hooks/PanelesSolares/usePanelesSolares";
import Combobox from "@/shared/components/combobox/Combobox";
import FormSearch from "../FormSearch";
import DataRange from "../DataRange";
import TablePanelesSolares from "./TablePanelesSolares";
import DeviseChart from "../DeviseChart";
import moment from "moment";
import { FindReportsRequest } from "../../interfaces/findReports/paneles-solares.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useDateRange from "../../hooks/useDateRange";
import useFilter from "../../hooks/useFilter";

interface SeccionPanelSolaresProps {
  generatePDF: () => void;
}

const SeccionPanelSolares = ({ generatePDF }: SeccionPanelSolaresProps) => {
  const {
    reports,
    loading,
    handlerFindReportsDay,
    handlerFindReportsMonth,
    handlerFindReportsWeek,
    handlerFindReportsCurrent,
    handlerResetReports,
    handlerFindReportsByDays,
    rangoFecha,
    labels: labelsFecha,
    averageReportsByHour,
  } = usePanelesSolares();

  const {
    filterDate,
    handleChangeDate,
    optionsFilterDate,
    filterDrone,
    handleChangeDrone,
    optionsDrones,
  } = useFilter({ handlerResetReports });

  useEffect(() => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrent(+filterDrone);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeek(+filterDrone);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonth(+filterDrone);
    }
  }, [filterDate, filterDrone]);

  const reporstByDay = averageReportsByHour();

  const labels = reports.data.length> 10 ? reporstByDay.map((report)=> report.hour) : labelsFecha;

  const Cp = reports.data.length> 10 ? reporstByDay.map((report) => report.Cp) : reports.data.map((report) => report.Cp);
  const Vp = reports.data.length> 10 ? reporstByDay.map((report) => report.Vp) : reports.data.map((report) => report.Vp);
  const Cb = reports.data.length> 10 ? reporstByDay.map((report) => report.Cb) : reports.data.map((report) => report.Cb);
  const Vb = reports.data.length> 10 ? reporstByDay.map((report) => report.Vb) : reports.data.map((report) => report.Vb);
  const Cc = reports.data.length> 10 ? reporstByDay.map((report) => report.Cc) : reports.data.map((report) => report.Cc);
  const Vc = reports.data.length> 10 ? reporstByDay.map((report) => report.Vc) : reports.data.map((report) => report.Vc);




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
    handlerFindReportsDay(data, +filterDrone);
  };

  const handleReset = () => {
    handlerResetReports();
    reset(initialForm);
  };

  const { date, setDate, fechaRequest } = useDateRange({
    idDrone: +filterDrone,
    handlerFindReportsByDays: handlerFindReportsByDays,
    handlerResetReports: handlerResetReports,
  });

  const onPagination = (page: number) => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrent(+filterDrone, page);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeek(+filterDrone, page);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonth(+filterDrone, page);
    }
    if (filterDate === "personalizado") {
      handlerFindReportsByDays(fechaRequest, +filterDrone, page);
    }
    if (filterDate === "diario") {
      handlerFindReportsDay(watch(), +filterDrone, page);
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

        <button className="btn-primary" onClick={() => generatePDF()}>
          Imprimir reporte
        </button>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="paneles bg-white p-4 rounded-lg shadow-lg">
          <div>
            <DeviseChart
              c={Cp}
              v={Vp}
              labelsDevise={labels}
              title={`Panel Solar ${rangoFecha}`}
              label1="Corriente"
              label2="Voltaje"
              height={250}
            />
          </div>
        </div>
        <div className="paneles bg-white p-4 rounded-lg shadow-lg">
          <div>
            <DeviseChart
              c={Cb}
              v={Vb}
              labelsDevise={labels}
              title={`Batería ${rangoFecha}`}
              label1="Corriente"
              label2="Voltaje"
              height={250}
            />
          </div>
        </div>
        <div className="paneles bg-white p-4 rounded-lg shadow-lg">
          <div>
            <DeviseChart
              c={Cc}
              v={Vc}
              labelsDevise={labels}
              title={`Cargador ${rangoFecha}`}
              label1="Corriente"
              label2="Voltaje"
              height={250}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <TablePanelesSolares response={reports} onPagination={onPagination} />
      </div>
    </>
  );
};

export default SeccionPanelSolares;
