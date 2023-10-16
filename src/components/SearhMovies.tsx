import React, { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { useQuery } from "react-query";
import { searchMoviesByTitle } from "../api/movies";
import { Movie } from "../types/Movie";

const SearchMovies: React.FC = () => {
  const { movies, setMovies } = useMovieContext();
  const [titleInput, setTitleInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useQuery<Movie[], Error>(
    ["searchMovie", searchTerm],
    () => searchMoviesByTitle(searchTerm as string),
    {
      enabled: searchTerm !== "",
    }
  );

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
      {movies && (
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <h2>
                {movie.Title} ({movie.Year})
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
