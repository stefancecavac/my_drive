import { QueryClient } from "@tanstack/react-query";

export const qClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
