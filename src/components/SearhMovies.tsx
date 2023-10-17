import React, { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { useQuery } from "react-query";
import { searchMoviesByTitle } from "../api/movies";
import { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";
import MovieGroupWorkerWrapper from "../workers/MovieGroupWorkerWrapper";
import { workerScript } from "../workers/BlobMovieGroupWorkerWrapper";

const SearchMovies: React.FC = () => {
  const { movies, setMovies } = useMovieContext();
  const [titleInput, setTitleInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [groupedMovies, setGroupedMovies] = useState<{
    [year: string]: Movie[];
  }>({});

  const { data, error, isLoading } = useQuery<Movie[], Error>(
    ["searchMovie", searchTerm],
    () => searchMoviesByTitle(searchTerm as string),
    {
      enabled: searchTerm !== "",
    }
  );

  useEffect(() => {
    if (movies && Array.isArray(movies)) {
      const handleWorkerMessage = (e: MessageEvent) => {
        setGroupedMovies(e.data);
      };

      const worker = new MovieGroupWorkerWrapper(
        workerScript,
        handleWorkerMessage
      );

      worker.postMessage(movies);

      // Cleanup the worker when the component unmounts
      return () => {
        worker.terminate();
      };
    }
  }, [movies]);

  useEffect(() => {
    if (data) {
      setMovies(data); //setting movies on global store so that app can benefit from it.
    }
  }, [data, setMovies]);

  const handleSearch = () => {
    setSearchTerm(titleInput);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4 font-bold">Search for a Movie</h1>
      <div className="flex items-center justify-center space-x-4">
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="p-2 w-64 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          placeholder="Enter movie title..."
        />
        <button
          onClick={handleSearch}
          disabled={titleInput === ""}
          className={`px-4 py-2 rounded-md bg-indigo-600 text-white ${
            titleInput === ""
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
        >
          Search
        </button>
      </div>

      {error && <p>Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {Object.keys(groupedMovies).length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.entries(groupedMovies).map(([year, movies]) => (
            <React.Fragment key={year}>
              <h2 className="col-span-full text-2xl mt-4">{year}</h2>
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
