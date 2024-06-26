"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../services/user";
import { UserResponse } from "../interfaces/user.interface";

const useUser = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    handlerGetUsers();
  }, []);

  const handlerGetUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  const findUserByFullName = (fullName: string) => {
    const user = users.find(
      (user) =>
        `${user.apellido} ${user.nombre}`.toLowerCase() ===
        fullName.toLowerCase()
    );
    return user;
  };

  return { users, handlerGetUsers, findUserByFullName };
};

export default useUser;
