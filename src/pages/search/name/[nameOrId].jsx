import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Loading } from "../../../components/Loading/Loading";
import { Layout } from "../../../components/Layout/Layout";
import { Grid } from "../../../components/Grid/Grid";
import { PokeCard } from "../../../components/PokeCard/PokeCard";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { baseURL, PokeAPI } from "../../../services/api";

export default function SearchNameOrId() {
  const {
    query: { nameOrId },
  } = useRouter();

  const { favoritesList, setFavoritesList } = useContext(PokemonContext);

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async () => {
    try {
      const url = `${baseURL}/pokemon/${nameOrId}`;
      const { data, status } = await PokeAPI.get(url);

      if (status === 200) {
        setPokemon(data);
      } else {
        setPokemon(null);
      }

      setLoading(false);
    } catch (error) {
      setPokemon(null);
      setLoading(false);
      console.error(error);
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
    if (nameOrId) {
      setLoading(true);
      getPokemon();
    }
  }, [nameOrId]);

  return (
    <Layout>
      <Grid gridTitle={`Pesquisa: ${nameOrId}`}>
        {!pokemon && !loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HiOutlineEmojiSad size={30} />
            <span>Não Encontrado</span>
          </div>
        )}

        {!!pokemon && (
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
        )}
      </Grid>

      <Loading isActive={loading} message="Pesquisando Pokémons ..." />
    </Layout>
  );
}
