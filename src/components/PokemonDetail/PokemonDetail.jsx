import { useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";

import styles from "./styles.module.scss";

export function PokemonDetail() {
  const { pokemon, favoritesList, setFavoritesList } =
    useContext(PokemonContext);

  const isFavorite = favoritesList.some(({ id }) => id === pokemon?.id);
  const [favorite, setFavorite] = useState(isFavorite || false);

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

  const getTypes = (name, index) => (
    <span key={index} className={`${styles.Type} ${styles[name]}`}>
      {name}
    </span>
  );

  const captilizeName = (name) => {
    const sep = "-";
    return name
      .split(sep)
      .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.DetailContainer}>
      <h2 className={styles.DetailTitle}>
        {!!pokemon ? (
          <>Detalhes de {captilizeName(pokemon.name)}</>
        ) : (
          <>Nenhum Pokémon com Esse Nome</>
        )}
      </h2>

      <div className={styles.Detail}>
        <div className={styles.DetailCard}>
          <div className={styles.DetailCardHeader}>
            <div className={styles.HeaderArea}>
              {favorite ? (
                <FaHeart
                  onClick={(ev) => {
                    ev.preventDefault();
                    setFavorite(!favorite);
                    popFavorite(pokemon);
                  }}
                  size={48}
                />
              ) : (
                <FaRegHeart
                  onClick={(ev) => {
                    ev.preventDefault();
                    setFavorite(!favorite);
                    appendFavorite(pokemon);
                  }}
                  size={48}
                />
              )}
              <Image
                src={
                  pokemon?.sprites.other["official-artwork"]["front_default"] ||
                  "/img/image-default.png"
                }
                width={240}
                height={240}
              />
            </div>

            <div className={styles.HeaderArea}>
              <b className={styles.CardId}>
                # {String(pokemon?.id).padStart(4, "0")}
              </b>

              <h3 className={styles.CardName}>{pokemon?.name}</h3>

              <div className={styles.CardTypes}>
                {pokemon?.types.map(({ type }, index) =>
                  getTypes(type.name, index)
                )}
              </div>
            </div>

            {/* <div className={styles.CardContent}>
              
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
