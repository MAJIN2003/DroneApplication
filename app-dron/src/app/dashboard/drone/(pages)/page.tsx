"use client";

import Link from "next/link";
import TableDrones from "../components/TableDrones";
import useDrone from "../hooks/useDrone";
import { useAuthStore } from "../../../(auth)/stores/authStore";
import { useRouter } from "next/navigation";

export default function DronesPage() {
  const { drones, removeDron, getAllDrones } = useDrone();
  const { user } = useAuthStore();
  const route = useRouter();
  if (user.role !== "admin") {
    return route.push("/dashboard/gestor-reportes");
  }
  return (
    <div className="h-full">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold ">Drones</h1>
          <Link href={"/dashboard/drone/nuevo"} className="btn-primary">
            Nuevo Dron
          </Link>
        </div>
        <TableDrones
          drones={drones}
          deleteDron={removeDron}
          getAllDrones={getAllDrones}
        />
      </div>
    </div>
  );
}
