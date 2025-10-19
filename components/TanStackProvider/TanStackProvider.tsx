"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface TanstackProviderProps {
  children: React.ReactNode;
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
