'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { LoginRequest } from "../interfaces/login/login-request.interface";
import useAuth from '../hooks/useAuth';



const FormLogin = () => {

  const {handlerLogin} = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginRequest>()

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    const login = await handlerLogin(data);
  }

  
  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username" className="block text-sm text-gray-800">
          Usuario
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("user.email", { required: "El email es requerido", pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/, message: "El email no es válido"}})}
        />
        <label htmlFor="username" className="block text-sm text-red-500">
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
          {...register("user.password", { required: "La contraseña es requerida", minLength: {value: 6, message: "La contraseña debe tener al menos 6 caracteres"}})}
        />
        <label htmlFor="password" className="block text-sm text-red-500">
          {errors.user?.password?.message}&nbsp;
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button type="submit" className="w-full btn-primary">
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
