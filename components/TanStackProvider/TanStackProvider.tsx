'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return new QueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = new QueryClient();
    return browserQueryClient;
  }
}

export default function TanStackProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
