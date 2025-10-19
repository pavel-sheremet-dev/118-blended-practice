"use client";

// import { checkSession, getUser } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // 1. перевірка сессії (сессія + отримання користувача) на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.

  useEffect(() => {
    const asyncWrapper = async () => {};
    asyncWrapper();
  }, []);

  // стан isRefreshing ???

  return children;
};

export default AuthProvider;
