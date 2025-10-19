"use client";

import { checkSession } from "@/lib/api/clientApi";
import { getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
// import { checkSession, getUser } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // 1. перевірка сессії (сессія + отримання користувача) на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const asyncWrapper = async () => {
      const isValidSession = await checkSession();
      if (isValidSession) {
        const user = await getUser();
        setUser(user);
      }
    };
    asyncWrapper();
  }, [setUser]);

  // стан isRefreshing ???

  return children;
};

export default AuthProvider;
