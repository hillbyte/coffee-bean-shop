import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Routes />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>, 
  document.getElementById("root")
);
