import Image from "next/image";

import styles from "./styles.module.scss";

export function Header({ logoSize }) {
  return (
    <header className={styles.Header}>
      <div className={styles.Row}>
        <div className={styles.Logo}>
          <Image
            src="/img/pokemon-logo.png"
            width={logoSize}
            height={logoSize / 2.25}
          />
        </div>
      </div>
      <div className={styles.Row}>
        <div className={styles.All}>
          <p>Todos Pokémons</p>
        </div>
        <div className={styles.Favorites}>
          <p>Favoritos</p>
        </div>
      </div>
    </header>
  );
}
