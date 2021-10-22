import axios from "axios";

export const baseURL = process.env.POKE_API;

export const PokeAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
