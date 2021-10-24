import { useContext } from "react";
import { Grid } from "../../components/Grid/Grid";
import { Layout } from "../../components/Layout/Layout";
import { PokemonContext } from "../../contexts/PokemonContext";
import { PokeCard } from "./../../components/PokeCard/PokeCard";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function Favorites() {
  const { favoritesList, setFavoritesList } = useContext(PokemonContext);

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

  const sortFavoritesById = function (a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  return (
    <Layout>
      <Grid gridTitle="Pokémons Favoritos">
        {favoritesList.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HiOutlineEmojiSad size={30} />
            <span>Nenhum Favorito</span>
          </div>
        )}
        {favoritesList.sort(sortFavoritesById).map((pokemon) => (
          <PokeCard
            key={pokemon?.id}
            data={{
              pokemon,
              add: appendFavorite,
              pop: popFavorite,
              isFavorite: true,
            }}
          />
        ))}
      </Grid>
    </Layout>
  );
}
