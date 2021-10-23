import styles from "./styles.module.scss";

export function Grid({ children, gridTitle }) {
  return (
    <div className={styles.GridContainer}>
      <h2 className={styles.GridTitle}>{gridTitle}</h2>
      <div className={styles.Grid}>{children}</div>
    </div>
  );
}
