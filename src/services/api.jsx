import axios from "axios";

export const PokeAPI = axios.create({
  baseURL: process.env.POKE_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
