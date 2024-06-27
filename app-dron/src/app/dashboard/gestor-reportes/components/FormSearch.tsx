"use client";

import { HiSearch } from "react-icons/hi";
import { FindReportsRequest } from "../interfaces/findReports/paneles-solares.interface";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface FormSearchProps {
  register: UseFormRegister<FindReportsRequest>;
  handleSubmit: UseFormHandleSubmit<FindReportsRequest, undefined>;
  watch: UseFormWatch<FindReportsRequest>;
  errors: FieldErrors<FindReportsRequest>;
  onSubmit: SubmitHandler<FindReportsRequest>;
  handleReset: () => void;
}

const FormSearch = ({
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  handleReset,
}: FormSearchProps) => {
  return (
    <form
      className="flex flex-wrap gap-2 md:gap-6 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="date" className="text-gray-700">
          Fecha
        </label>
        <div>
          <input
            type="date"
            id="date"
            className="input"
            {...register("fecha", { required: "La fecha es requerida" })}
          />
          <label htmlFor="date" className="block text-sm text-red-500">
            {errors.fecha?.message}
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="time1" className="text-gray-700">
          De
        </label>
        <div>
          <input
            type="time"
            id="time1"
            className="input"
            {...register("time1")}
          />
          <label htmlFor="time1" className="block text-sm text-red-500">
            {errors.time1?.message}
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="time2" className="text-gray-700">
          A
        </label>
        <div>
          <input
            type="time"
            id="time2"
            className="input"
            {...register("time2", {
              validate: (value) =>{
                if (!watch("time1")) {
                  return true;
                }
                if (value < watch("time1")) {
                  return "La hora final debe ser mayor a la hora inicial";
                }
                return true;
              },
            })}
          />
          <label htmlFor="time2" className="block text-sm text-red-500">
            {errors.time2?.message}
          </label>
        </div>
      </div>

      <button type="submit" className="btn-secondary">
        <HiSearch className="w-6 h-6" />
      </button>

      <button type="reset" className="btn-danger" onClick={handleReset}>
        Restablecer
      </button>
    </form>
  );
};

export default FormSearch;
