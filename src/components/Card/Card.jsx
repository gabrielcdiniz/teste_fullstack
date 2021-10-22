import Image from "next/image";
import { useContext, useState } from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PokemonContext } from "../../contexts/PokemonContext";

import styles from "./styles.module.scss";

export function PokeCard({ data }) {
  const { favoritesList, setFavoritesList } = useContext(PokemonContext);

  const [favorite, setFavorite] = useState(false);

  const getTypes = (name, index) => (
    <span key={index} className={`${styles.Type} ${styles[name]}`}>
      {name}
    </span>
  );

  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        {favorite ? (
          <FaHeart onClick={() => setFavorite(!favorite)} size={24} />
        ) : (
          <FaRegHeart onClick={() => setFavorite(!favorite)} size={24} />
        )}
        <Image
          src={
            data?.sprites.other["official-artwork"]["front_default"] ||
            "/img/image-default.png"
          }
          width={140}
          height={140}
        />
      </div>

      <div className={styles.CardContent}>
        <b className={styles.CardId}># {String(data?.id).padStart(4, "0")}</b>

        <h3 className={styles.CardName}>{data?.name}</h3>

        <div className={styles.CardTypes}>
          {data?.types.map(({ type }, index) => getTypes(type.name, index))}
        </div>
      </div>
    </div>
  );
}
