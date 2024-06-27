"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Auth, UserAuth } from "../interfaces/store/auth.interface";

const UserInitial = {
  username: "",
  token: "",
  email: "",
} as UserAuth;

export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      user: UserInitial,
      login: (user: UserAuth) => {
        set({user})
      },
      logout: () => {
        set({user: UserInitial})
      }
    }),
    { name: "auth" }
  )
);
