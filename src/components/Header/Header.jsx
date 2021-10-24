import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export function Header({ logoSize }) {
  return (
    <header className={styles.Header}>
      <div className={styles.Row}>
        <Link href="/">
          <div className={styles.Logo}>
            <Image
              src="/img/pokemon-logo.png"
              width={logoSize}
              height={logoSize / 2.25}
            />
          </div>
        </Link>
      </div>

      <div className={styles.Row}>
        <Link href="/">
          <div className={styles.All}>
            <p>Todos Pokémons</p>
          </div>
        </Link>

        <Link href="/search">
          <div className={styles.Search}>
            <p>Pesquisar Pokémons</p>
          </div>
        </Link>

        <Link href="/favorites">
          <div className={styles.Favorites}>
            <p>Pokémons Favoritos</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
