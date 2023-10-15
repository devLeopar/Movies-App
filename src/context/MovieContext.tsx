import React, { createContext, useContext, useState } from "react";
import { ReactCustomFunctionalComponent } from "../globalTypes";

interface MovieContextProps {
  title: string | null;
  setTitle: (title: string) => void;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider: ReactCustomFunctionalComponent = ({ children }) => {
  const [title, setTitleState] = useState<string | null>(null);

  const setTitle = (title: string) => {
    setTitleState(title);
  };

  return (
    <MovieContext.Provider value={{ title, setTitle }}>
      {children}
    </MovieContext.Provider>
  );
};
