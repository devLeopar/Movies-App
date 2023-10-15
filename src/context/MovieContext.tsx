import React, { createContext, useContext, useState } from "react";
import { RCFC } from "../globalTypes";

interface Movie {
  Title: string;
  Year: string;
  // ... other movie properties
}

interface MovieContextProps {
  title: string | null;
  setTitle: (title: string) => void;
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
  const [title, setTitleState] = useState<string | null>(null);
  const [movies, setMoviesState] = useState<Movie[] | null>(null);

  const setTitle = (title: string) => {
    setTitleState(title);
  };

  const setMovies = (movies: Movie[]) => {
    setMoviesState(movies);
  };

  return (
    <MovieContext.Provider value={{ title, setTitle, movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
