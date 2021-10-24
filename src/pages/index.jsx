import { useContext, useEffect, useState } from "react";
import { Grid } from "../components/Grid/Grid";
import { Layout } from "../components/Layout/Layout";
import { Loading } from "../components/Loading/Loading";
import { LoadMore } from "../components/LoadMore/LoadMore";
import { PokemonContext } from "../contexts/PokemonContext";
import { baseURL, PokeAPI } from "../services/api";
import { PokeCard } from "../components/PokeCard/PokeCard";

function IndexPage() {
  const { pokemonList, setPokemonList, favoritesList, setFavoritesList } =
    useContext(PokemonContext);

  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(
    `${baseURL}/pokemon?limit=12&offset=${pokemonList.length}`
  );

  const getPokemonsList = async () => {
    const {
      data: { results, next },
    } = await PokeAPI.get(nextUrl);

    setNextUrl(next);

    let pokemonsDescriptions = [];
    for (const { url } of results) {
      const { data } = await PokeAPI.get(url);
      pokemonsDescriptions.push(data);
    }

    setPokemonList((prev) => [...prev, ...pokemonsDescriptions]);
    setLoading(false);
  };

  const appendFavorite = (pokemon) => {
    setFavoritesList((prev) => {
      prev.push(pokemon);
      return [...prev];
    });
  };

  const popFavorite = (pokemon) => {
    const prevList = [...favoritesList];
    const index = prevList.findIndex(({ id }) => id === pokemon.id);

    prevList.splice(index, 1);

    setFavoritesList(prevList);
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      setLoading(true);
      getPokemonsList();
    }
  }, []);

  return (
    <Layout>
      <Grid gridTitle="Todos os Pokémons">
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
      </Grid>
      <Loading isActive={loading} message="Carregando Pokemons ..." />
      <LoadMore
        action={() => {
          setLoading(true);
          getPokemonsList();
        }}
      />
    </Layout>
  );
}

export default IndexPage;
