import { createContext, useState } from "react";

export const PokemonContext = createContext({});

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  return (
    <PokemonContext.Provider
      value={{ pokemon, setPokemon, pokemonList, setPokemonList, favoritesList, setFavoritesList }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
