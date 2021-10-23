import { useContext, useEffect, useState } from "react";
import { Grid } from "../components/Grid/Grid";
import { Loading } from "../components/Loading/Loading";
import { LoadMore } from "../components/LoadMore/LoadMore";
import { Layout } from "../components/Layout/Layout";
import { PokemonContext } from "../contexts/PokemonContext";
import { baseURL, PokeAPI } from "../services/api";

import { PokeCard } from "./../components/Card/Card";

function IndexPage() {
  const { pokemonList, setPokemonList } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(`${baseURL}?limit=12`);

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

  useEffect(() => {
    setLoading(true);
    getPokemonsList();
  }, []);

  return (
    <Layout>
      <Grid>
        {pokemonList.map((pokemon) => (
          <PokeCard key={pokemon?.id} data={pokemon} />
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
