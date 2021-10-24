import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Grid } from "../../../components/Grid/Grid";
import { Layout } from "../../../components/Layout/Layout";
import { Loading } from "../../../components/Loading/Loading";
import { PokeCard } from "../../../components/PokeCard/PokeCard";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { baseURL, PokeAPI } from "../../../services/api";

export default function Search() {
  const {
    query: { type: pokemonType },
  } = useRouter();

  const { favoritesList, setFavoritesList } = useContext(PokemonContext);

  const [loading, setLoading] = useState(false);
  const [pokemonsSearchList, setPokemonsSearchList] = useState([]);

  const getPokemonsList = async () => {
    try {
      const {
        data: { pokemon },
      } = await PokeAPI.get(`${baseURL}/type/${pokemonType}`);

      let pokemons = [];
      for (const {
        pokemon: { url },
      } of pokemon) {
        const { data } = await PokeAPI.get(url);
        pokemons.push(data);
      }

      setPokemonsSearchList((prev) => [...prev, ...pokemons]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setPokemonsSearchList([]);
      setLoading(false);
    }
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
    setLoading(true);
    getPokemonsList();
  }, [pokemonType]);

  return (
    <Layout>
      <Grid gridTitle="Pokémons Encontrados">
        {pokemonsSearchList.length === 0 && !loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HiOutlineEmojiSad size={30} />
            <span>Nenhum Pokémon</span>
          </div>
        )}

        {pokemonsSearchList.map((pokemon) => (
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

      <Loading isActive={loading} message="Pesquisando Pokémons ..." />
    </Layout>
  );
}
