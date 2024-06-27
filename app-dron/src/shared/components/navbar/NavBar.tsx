"use client";
import useAuth from "@/app/(auth)/hooks/useAuth";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import Menu from "./MenuItem";

const NavBar = () => {
  const { handlerLogout } = useAuth();
  const { user } = useAuthStore();
  const initials = `${user?.nombre?.charAt(0)}${user?.apellido?.charAt(0)}`;

  const items = [
    { name: "Reportes", url: "/dashboard/gestor-reportes" },
    { name: "Drones", url: "/dashboard/drone" },
  ];

  return (
    <nav className="flex flex-col justify-between items-center shadow bg-gray-800 sticky z-50 top-0">
      <div className="flex flex-col lg:flex-row items-center justify-between container p-4 gap-4">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-white ml-2 text-xl">Gestor Reportes UAV</h1>
        </div>
        {user.role === "admin" && (
          <>
            <Menu items={items} />
          </>
        )}
        <div className="flex items-center">
          <button
            className="btn-primary"
            onClick={() => {
              handlerLogout();
            }}
          >
            Cerrar sesión
          </button>
          <div className="flex items-center ml-3">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white mr-2">
              {initials}
            </div>
            <p className="text-white font-semibold">
              {user?.nombre} {user?.apellido}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
