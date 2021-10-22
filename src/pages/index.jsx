import { useContext, useEffect, useState } from "react";
import { Grid } from "../components/Grid/Grid";
import { Loading } from "../components/Loading/Loading";
import { PokemonContext } from "../contexts/PokemonContext";
import { baseURL, PokeAPI } from "../services/api";

import { PokeCard } from "./../components/Card/Card";

function IndexPage() {
  const { pokemonList, setPokemonList } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);

  const getPokemonsList = async () => {
    const {
      data: { results },
    } = await PokeAPI.get(`${baseURL}?limit=12`);

    let pokemonsDescriptions = [];
    for (const { url } of results) {
      const { data } = await PokeAPI.get(url);
      pokemonsDescriptions.push(data);
    }

    setPokemonList(pokemonsDescriptions);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPokemonsList();
  }, []);

  return (
    <>
      <Loading isActive={loading} message="Carregando Pokemons ..." />
      {!loading && (
        <Grid>
          {pokemonList.map((pokemon) => (
            <PokeCard key={pokemon?.id} data={pokemon} />
          ))}
        </Grid>
      )}
    </>
  );
}

export default IndexPage;
