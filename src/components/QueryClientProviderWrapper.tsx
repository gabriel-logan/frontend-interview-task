"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const MINUTE = 1000 * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: DAY, // 24 hours
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
