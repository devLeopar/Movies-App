import React, { createContext, useContext, useState } from "react";
import { Movie } from "../types/Movie";
import { RCFC } from "../globalTypes";

interface MovieContextProps {
  movies: Movie[] | null;
  setMovies: (movies: Movie[]) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider: RCFC = ({ children }) => {
  const [movies, setMoviesState] = useState<Movie[] | null>(null);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies: setMoviesState,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
