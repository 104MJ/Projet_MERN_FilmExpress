import Movie from "../models/Movie";
import axios, { AxiosError } from "axios";

// const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";
const API_BASE_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const MovieService = {
  async getAllMovies(): Promise<ResponseApi<Movie[]>> {
    try {
      const response = await api.get<ResponseApi<Movie[]>>("/movies");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message ||
            "Erreur lors de la récupération des films",
        );
      }
      throw error;
    }
  },
};

export default MovieService;
