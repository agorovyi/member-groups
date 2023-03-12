import styles from "./styles.module.scss";

export function SkeletonLoader() {
  return <span className={styles.skeleton} aria-busy="true"></span>;
}
