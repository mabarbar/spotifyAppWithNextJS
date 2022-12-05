import React from "react";
import styles from "./Container.module.css";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
