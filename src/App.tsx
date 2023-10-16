import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "./context/MovieContext";
import { RCFC } from "./globalTypes";
import SearchMovies from "./components/SearhMovies";

const queryClient = new QueryClient();

export const App: RCFC = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <SearchMovies />
      </MovieProvider>
    </QueryClientProvider>
  );
};
