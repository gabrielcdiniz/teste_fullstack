import Image from "next/image";

import styles from "./styles.module.scss";

export function Loading({ isActive, message }) {
  return (
    <>
      {isActive && (
        <div className={styles.LoadingContainer}>
          {message && (<span>{message}</span>)}
          <Image
            src="/img/loading.gif"
            width={120}
            height={120}
          />
        </div>
      )}
    </>
  );
}
