import { useContext, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import { Layout } from "../../../components/Layout/Layout";
import { Grid } from "../../../components/Grid/Grid";
import { PokeCard } from "../../../components/PokeCard/PokeCard";
import { PokemonContext } from "../../../contexts/PokemonContext";

export default function Search() {
  const { favoritesList, setFavoritesList } = useContext(PokemonContext);

  const [loading, setLoading] = useState(false);
  const [pokemonsSearchList, setPokemonsSearchList] = useState([]);

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

  return (
    <Layout>
      <Grid gridTitle="Pokémons Encontrados">
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
