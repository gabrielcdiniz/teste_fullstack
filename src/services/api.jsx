import axios from "axios";

export const baseURL = process.env.POKE_API_V2;

export const PokeAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
