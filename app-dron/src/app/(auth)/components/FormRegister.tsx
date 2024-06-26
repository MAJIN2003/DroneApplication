"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterRequest } from "../interfaces/register/register-request.interface";
import useAuth from "../hooks/useAuth";

const FormRegister = () => {
  const { handlerRegister } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest & { user: { confirmPassword: string } }>(
    {
      defaultValues: {
        user: {
          username: "",
          email: "",
          password: "",
          nombre: "",
          apellido: "",
          role: "admin",
          confirmPassword: "",
        },
      },
    }
  );

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    handlerRegister(data);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm text-gray-800">
          Nombre
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("user.nombre", {
            required: "El nombre es requerido",
          })}
        />
        <label htmlFor="name" className="block text-sm text-red-500">
          {errors.user?.nombre?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm text-gray-800">
          Apellido
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("user.apellido", {
            required: "El apellido es requerido",
          })}
        />
        <label htmlFor="lastName" className="block text-sm text-red-500">
          {errors.user?.apellido?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm text-gray-800">
          Usuario
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("user.username", {
            required: "El usuario es requerido",
          })}
        />
        <label htmlFor="username" className="block text-sm text-red-500">
          {errors.user?.username?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="email" className="block text-sm text-gray-800">
          Correo electrónico
        </label>
        <input
          type="email"
          className="input mt-1"
          {...register("user.email", {
            required: "El correo electrónico es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/,
              message: "El correo electrónico no es válido",
            },
          })}
        />
        <label htmlFor="email" className="block text-sm text-red-500">
          {errors.user?.email?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="password" className="block text-sm text-gray-800">
          Contraseña
        </label>
        <input
          type="password"
          className="input mt-1"
          {...register("user.password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        <label htmlFor="password" className="block text-sm text-red-500">
          {errors.user?.password?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label
          htmlFor="confirmPassword"
          className="block text-sm text-gray-800"
        >
          Confirmar contraseña
        </label>
        <input
          type="password"
          className="input mt-1"
          {...register("user.confirmPassword", {
            required: "La confirmación de la contraseña es requerida",
            validate: (value) =>
              value === watch("user.password") ||
              "Las contraseñas no coinciden",
          })}
        />
        <label htmlFor="confirmPassword" className="block text-sm text-red-500">
          {errors.user?.confirmPassword?.message} &nbsp;
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button type="submit" className="w-full btn-primary">
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
