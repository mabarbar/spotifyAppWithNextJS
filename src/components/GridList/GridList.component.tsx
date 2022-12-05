import React, { PropsWithChildren } from "react";
import styles from "./GridList.module.css";

const GridList = ({ children }: PropsWithChildren<{}>) => (
  <ul role="list" className={styles.root}>
    {children}
  </ul>
);

export default GridList;
