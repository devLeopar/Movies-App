import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "../App";
import { MovieProvider } from "../context/MovieContext";

const queryClient = new QueryClient();

const Root: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <App />
      </MovieProvider>
    </QueryClientProvider>
  );
};

export default Root;
