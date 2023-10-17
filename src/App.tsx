import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "./context/MovieContext";
import { RCFC } from "./globalTypes";
import SearchMovies from "./components/SearhMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";

const queryClient = new QueryClient();

export const App: RCFC = ({}) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MovieProvider>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/" element={<SearchMovies />} />
          </Routes>
        </MovieProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
