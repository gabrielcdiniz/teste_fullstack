import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Layout } from "../../components/Layout/Layout";
import { Loading } from "../../components/Loading/Loading";
import { baseURL, PokeAPI } from "../../services/api";
import { PokemonContext } from "../../contexts/PokemonContext";
import { PokemonDetail } from "../../components/PokemonDetail/PokemonDetail";

export default function Detail() {
  const {
    query: { pokemon: pokemonName },
  } = useRouter();

  const { setPokemon } = useContext(PokemonContext);

  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    const url = `${baseURL}/${pokemonName}`;
    const { data, status } = await PokeAPI.get(url);

    console.log("DATA POKE, STATUS", data, status);
    if (status === 200) {
      setPokemon(data);
    } else {
      setPokemon(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("to chamando");
    if (pokemonName) {
      setLoading(true);
      getPokemon();
    }
  }, [pokemonName]);

  return (
    <Layout>
      <PokemonDetail />

      {/* <Grid gridTitle="Todos os Pokémons">
        {pokemonList.map((pokemon) => (
          <PokeCard
            key={pokemon?.id}
            data={{
              pokemon,
              add: appendFavorite,
              pop: popFavorite,
              isFavorite: favoritesList.some(
                (favorite) => favorite.id === pokemon.id
              ),
            }}
          />
        ))}
      </Grid> */}

      <Loading isActive={loading} message="Carregando Detalhes ..." />
    </Layout>
  );
}
