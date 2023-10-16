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
    <div>
      <h1>Search for a Movie</h1>
      <input
        type="text"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <button onClick={handleSearch} disabled={titleInput === ""}>
        Search
      </button>

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
