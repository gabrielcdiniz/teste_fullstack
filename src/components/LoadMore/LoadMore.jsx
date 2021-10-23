import { MdCatchingPokemon } from "react-icons/md";

import styles from "./styles.module.scss";

export function LoadMore({ action }) {
  return (
    <div className={styles.LoadMore}>
      <button className={styles.Button} onClick={action}>
        <span>Buscar mais Pokémons</span>
        <MdCatchingPokemon size={30} />
      </button>
    </div>
  );
}
