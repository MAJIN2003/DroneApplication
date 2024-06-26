"use client";

import { useAuthStore } from "@/app/(auth)/stores/authStore";
import axios, { AxiosRequestHeaders } from "axios";

const getToken = () => {
  const { token } = useAuthStore.getState().user;
  return token;
};

const droneApi = axios.create({
  baseURL: "http://localhost:3000",
});

droneApi.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = {
      Authorization: token,
      ...config.headers,
    } as AxiosRequestHeaders;
  } else {
    config.headers = {
      ...config.headers,
    } as AxiosRequestHeaders;
  }
  return config;
});

export default droneApi;
