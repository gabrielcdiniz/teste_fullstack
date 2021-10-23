import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import styles from "./styles.module.scss";

export function PokeCard({ data: { pokemon, add, pop, isFavorite } }) {
  const [favorite, setFavorite] = useState(isFavorite || false);

  const getTypes = (name, index) => (
    <span key={index} className={`${styles.Type} ${styles[name]}`}>
      {name}
    </span>
  );

  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        {favorite ? (
          <FaHeart
            onClick={() => {
              setFavorite(!favorite);
              pop(pokemon);
            }}
            size={24}
          />
        ) : (
          <FaRegHeart
            onClick={() => {
              setFavorite(!favorite);
              add(pokemon);
            }}
            size={24}
          />
        )}
        <Image
          src={
            pokemon?.sprites.other["official-artwork"]["front_default"] ||
            "/img/image-default.png"
          }
          width={140}
          height={140}
        />
      </div>

      <div className={styles.CardContent}>
        <b className={styles.CardId}>
          # {String(pokemon?.id).padStart(4, "0")}
        </b>

        <h3 className={styles.CardName}>{pokemon?.name}</h3>

        <div className={styles.CardTypes}>
          {pokemon?.types.map(({ type }, index) => getTypes(type.name, index))}
        </div>
      </div>
    </div>
  );
}
