import React from "react";
import Image from "next/image";

import styles from "./Header.module.css";
import { HeaderPlaylist } from "~/views/Playlist/Playlist.view";

export interface Props extends HeaderPlaylist {}

const Header = ({ color, image, url, name, owner }: HeaderPlaylist) => {
  return (
    <div className={styles.header}>
      <div className={styles.mainImageContainer}>
        <div
          className={styles.playlistColorBadge}
          style={{ background: color }}
        />
        {image ? (
          <Image
            src={image}
            className={styles.mainImage}
            width={100}
            height={100}
            alt="playlist image"
          />
        ) : (
          <div className={`${styles.mainImage} ${styles.placeholder}`} />
        )}
      </div>

      <div className={styles.headerInfo}>
        <a
          href={url}
          className={styles.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>

        <span className={styles.owner}>{owner}</span>
      </div>
    </div>
  );
};

export default Header;
