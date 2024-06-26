import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { DronForm } from "../interfaces/drones.interface";
import Link from "next/link";
import useUser from "../../users/hooks/useUser";

interface FormDronesProps {
  redirect: string;
  textAction: string;
  register: UseFormRegister<DronForm>;
  handleSubmit: UseFormHandleSubmit<DronForm, undefined>;
  onSubmit: SubmitHandler<DronForm>;
  errors: FieldErrors<DronForm>;
}

const FormDrones = ({
  redirect,
  textAction,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: FormDronesProps) => {
  const { users } = useUser();
  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input11" className="block text-sm text-gray-800">
          Nombre
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("nombre", {
            required: "El nombre es requerido",
          })}
        />
        <label htmlFor="input11" className="block text-sm text-red-500">
          {errors.nombre?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input12" className="block text-sm text-gray-800">
          Descripción
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("descripcion", {
            required: "La descripción es requerida",
          })}
        />
        <label htmlFor="input12" className="block text-sm text-red-500">
          {errors.descripcion?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input13" className="block text-sm text-gray-800">
          Número de serie
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("numero_serie", {
            required: "El número de serie es requerido",
          })}
        />
        <label htmlFor="input13" className="block text-sm text-red-500">
          {errors.numero_serie?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input1" className="block text-sm text-gray-800">
          Tipo de dron
        </label>
        <select
          className="input mt-1"
          {...register("tipo_dron", {
            required: "El tipo de dron es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          <option value="multirotor">Multirotor</option>
          <option value="ala_fija">Ala Fija</option>
        </select>
        <label htmlFor="input1" className="block text-sm text-red-500">
          {errors.tipo_dron?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input2" className="block text-sm text-gray-800">
          Capacidad de batería
        </label>
        <div className="flex items-center mt-1">
          <input
            type="text"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 rounded-r-0"
            {...register("capacidad_bateria", {
              required: "La capacidad de batería es requerida",
              min: { value: 1, message: "La capacidad debe ser mayor a 0 mA" },
              max: {
                value: 2500,
                message: "La capacidad debe ser menor o igual a 2500 mA",
              },
              validate: (value) =>
                !isNaN(value) || "La capacidad de batería debe ser un número",
            })}
          />
          <p className="px-4 py-2 text-gray-500 bg-gray-100 border rounded-r-lg">
            mA
          </p>
        </div>

        <label htmlFor="input2" className="block text-sm text-red-500">
          {errors.capacidad_bateria?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input3" className="block text-sm text-gray-800">
          Maximo viento de vuelo
        </label>
        <div className="flex items-center mt-1">
        <input
          type="text"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 rounded-r-0"
          {...register("max_viento_vuelo", {
            required: "El maximo viento de vuelo es requerido",
            min: {
              value: 1,
              message: "El maximo viento debe ser mayor a 0 km/h",
            },
            max: {
              value: 80,
              message: "El maximo viento debe ser menor o igual a 80 km/h",
            },
            validate: (value) =>
              !isNaN(value) || "El maximo viento debe ser un número",
          })}
        />
        <p className="px-4 py-2 text-gray-500 bg-gray-100 border rounded-r-lg">
          km/h
          </p>
        </div>
        <label htmlFor="input3" className="block text-sm text-red-500">
          {errors.max_viento_vuelo?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="input4" className="block text-sm text-gray-800">
          Tipo de placa
        </label>
        <select
          className="input mt-1"
          {...register("tipo_placa", {
            required: "El tipo de placa es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          <option value="arduino">Arduino</option>
          <option value="berrypi">Berry Pi</option>
        </select>
        <label htmlFor="input4" className="block text-sm text-red-500">
          {errors.tipo_placa?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="input5" className="block text-sm text-gray-800">
          Usuario
        </label>
        <select
          className="input mt-1"
          {...register("user_id", {
            required: "El usuario es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre + " " + user.apellido}
            </option>
          ))}
        </select>
        <label htmlFor="input5" className="block text-sm text-red-500">
          {errors.user_id?.message} &nbsp;
        </label>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button type="submit" className=" btn-primary">
          {textAction}
        </button>
        <Link href={redirect} className=" btn-danger">
          Cancelar
        </Link>
      </div>
    </form>
  );
};

export default FormDrones;
