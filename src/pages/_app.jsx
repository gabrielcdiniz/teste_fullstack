import Head from 'next/head';
import { PokemonProvider } from "../contexts/PokemonContext";

import "../styles/global.scss";

function PokeApp({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Head>
          <title>Pokémon NextJS</title>
      </Head>
      <Component {...pageProps} />
    </PokemonProvider>
  );
}

export default PokeApp;
