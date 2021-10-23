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
          <a className={styles.All}>
            <div>
              <p>Todos Pokémons</p>
            </div>
          </a>
        </Link>

        <Link href="/favorites">
          <a className={styles.Favorites}>
            <div>
              <p>Pokémons Favoritos</p>
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
