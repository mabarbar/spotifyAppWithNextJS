import React from "react";
import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.root}>
    <div className={`${styles.circle} ${styles.circle1}`} />
    <div className={`${styles.circle} ${styles.circle2}`} />
    <div className={`${styles.circle} ${styles.circle3}`} />
  </div>
);

export default Loader;
