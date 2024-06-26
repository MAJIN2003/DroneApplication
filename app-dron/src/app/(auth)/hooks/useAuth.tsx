"use client";

import { toast } from "react-toastify";
import { LoginRequest } from "../interfaces/login/login-request.interface";
import { RegisterRequest } from "../interfaces/register/register-request.interface";
import { login, register, logout } from "../services/auth";
import { useAuthStore } from "../stores/authStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { user, login: loginStore, logout: logoutStore } = useAuthStore();
  const router = useRouter();

  const handlerLogin = async (user: LoginRequest) => {
    try {
      const loginPromise = login(user);
      toast.promise(loginPromise, {
        pending: "Iniciando sesión",
        success: "Usuario iniciado 👌",
        error: "Error al iniciar 🤯",
      });

      const response = await loginPromise;
      const { code, data, message } = response.status;

      Cookies.set("token", data.user.token, {
        secure: true,
        sameSite: "Strict",
      });
      router.refresh();
      loginStore(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerRegister = async (user: RegisterRequest) => {
    try {
      const registerPromise = register(user);

      toast.promise(registerPromise, {
        pending: "Registrando usuario",
        success: "Usuario registrado 👌",
        error: "Error al registrar 🤯",
      });

      const response = await registerPromise;
      const { code, data, message } = response.status;
      Cookies.set("token", data.token, { secure: true, sameSite: "Strict" });
      router.refresh();
      loginStore(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerLogout = async () => {
    try {
      await logout();
      Cookies.remove("token");
      router.push("/login");
      logoutStore();
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      router.push("/login");
      logoutStore();
    }
  };

  return { handlerLogin, handlerRegister, handlerLogout };
};

export default useAuth;
