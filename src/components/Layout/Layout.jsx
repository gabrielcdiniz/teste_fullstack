import { Header } from "../Header/Header";

import styles from "./styles.module.scss";

export function Layout({ children }) {
  return (
    <div className={styles.Layout}>
      <Header logoSize={120} />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
