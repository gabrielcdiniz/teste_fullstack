import styles from "./styles.module.scss";

export function Grid({ children }) {
  return (
    <div className={styles.GridContainer}>
      <div className={styles.Grid}>{children}</div>
    </div>
  );
}
