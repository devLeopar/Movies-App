import React from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const MovieDetail: React.FC = () => {
  const { movies } = useMovieContext();
  const { id } = useParams();

  if (!movies) {
    return <div>Loading movies...</div>;
  }

  // Find the movie from the global context using the id.
  const movie = movies.find((movie) => movie.imdbID === id);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        className="w-full rounded-md mb-4"
        src={movie.Poster}
        alt={movie.Title}
      />
      <h2 className="text-2xl font-bold">{movie.Title}</h2>
      <p className="text-xl text-gray-500">{movie.Year}</p>
      <a
        className="text-blue-500"
        href={`https://www.imdb.com/title/${movie.imdbID}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on IMDB
      </a>
    </div>
  );
};

export default MovieDetail;
