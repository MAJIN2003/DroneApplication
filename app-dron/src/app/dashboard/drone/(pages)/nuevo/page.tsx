"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { DronForm } from "../../interfaces/drones.interface";
import FormDrones from "../../components/FormDrones";
import useDrone from "../../hooks/useDrone";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import { useRouter } from "next/navigation";

export default function NuevoPage() {
  const { user } = useAuthStore();
  const router = useRouter();
 
  const { createDron } = useDrone();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DronForm>();

  const onSubmit: SubmitHandler<DronForm> = (data) => {
    createDron(data);
  };

  if (user.role !== "admin") {
    return router.push("/dashboard/gestor-reportes");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <h1 className="text-center text-2xl font-bold ">Nuevo Dron</h1>
        <FormDrones
          redirect="/dashboard/drone"
          textAction="Crear"
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
