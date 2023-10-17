import React from "react";
import { Movie } from "../types/Movie";
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-md shadow-md p-4 m-2">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          className="w-full rounded-md"
          src={movie.Poster}
          alt={movie.Title}
        />
        <h3 className="text-xl mt-2 font-semibold">{movie.Title}</h3>
        <p className="text-gray-500">{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
