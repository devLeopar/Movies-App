import axios from "axios";
import { Movie } from "../types/Movie";

const API_ENDPOINT = "http://www.omdbapi.com/";
const API_KEY = "8ea39b15";

export const searchMovieByTitle = async (title: string): Promise<Movie> => {
  const response = await axios.get<Movie>(API_ENDPOINT, {
    params: {
      apikey: API_KEY,
      t: title,
    },
  });

  if (response.data.Response === "False") {
    throw new Error("Movie not found");
  }

  return response.data;
};
