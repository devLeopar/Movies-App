import axios from "axios";
import { Movie } from "../types/Movie";

const API_ENDPOINT = "http://www.omdbapi.com/";
const API_KEY = "8ea39b15";

export const searchMoviesByTitle = async (title: string): Promise<Movie[]> => {
  const response = await axios.get(API_ENDPOINT, {
    params: {
      apikey: API_KEY,
      s: title,
    },
  });

  if (response.data.Response === "False") {
    throw new Error("Movies not found");
  }

  return response.data.Search;
};
