"use client";

import { useEffect, useState } from "react";
import { Dron, Drones, DronForm } from "../interfaces/drones.interface";
import { create, getAll, remove, update } from "../services/drone";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const initialState: Drones = {
  data: [],
  pagination: {
    count: 0,
    page: 0,
    items: 0,
    pages: 0,
    next: null,
    prev: null,
  },
};

const useDrone = () => {
  const [drones, setDrones] = useState<Drones>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getAllDrones();
  }, []);

  const getAllDrones = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await getAll(page);
      setDrones(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const findDroneById = (id: number) =>
    drones?.data.find((dron) => dron.id === id);

  const createDron = async (dron: DronForm) => {
    try {
      const promise = create(dron);
      toast.promise(promise, {
        pending: "Creando dron...",
        success: "Dron creado",
        error: "Error al crear dron",
      });
      await promise;
      router.push("/dashboard/drone");
      getAllDrones();
    } catch (error) {
      console.error(error);
    }
  };

  const updateDron = async (dron: DronForm, id: number) => {
    try {
      const promise = update(dron, id);
      toast.promise(promise, {
        pending: "Actualizando dron...",
        success: "Dron actualizado",
        error: "Error al actualizar dron",
      });
      await promise;
      router.push("/dashboard/drone");
      getAllDrones();
    } catch (error) {
      console.error(error);
    }
  };

  const removeDron = async (id: number) => {
    try {
      Swal.fire({
        title: "Estas seguro de eliminar el dron?",
        text: "El dron solo se puede eliminar si no tiene datos asignados!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const promise = remove(id);
          toast.promise(promise, {
            pending: "Eliminando dron...",
            success: "Dron eliminado",
            error: "No se puede eliminar el dron",
          });
          promise.then(() => getAllDrones());
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    drones,
    getAllDrones,
    createDron,
    findDroneById,
    updateDron,
    loading,
    removeDron,
  };
};

export default useDrone;
