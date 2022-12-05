import React from "react";
import Link from "next/link";
import { ModelWithId } from "~/models/Playlist.model";
import styles from "./GridListItem.module.css";

type Props = {
  item: ModelWithId;
};

const GridListItem = ({ item }: Props) => (
  <li key={item.spotifyId} className={styles.root}>
    <div className={styles.playlist}>
      <div
        className={styles.playlistColorSign}
        style={{ backgroundColor: item.color }}
      />

      <Link
        href={`/playlist/${encodeURIComponent(item.id)}`}
        className={styles.playlistName}
      >
        {item.name}
      </Link>
    </div>

    <span className={styles.ownerName}>{item.owner}</span>
  </li>
);

export default GridListItem;
