import React from "react";
import Image from "next/image";
import { PlayIcon, LinkIcon } from "@heroicons/react/20/solid";

import styles from "./Track.module.css";
import usePlayer from "~/hooks/usePlayer.hook";

interface Props {
  track: SpotifyApi.TrackObjectFull;
  index: number;
}

const Track = ({ track, index }: Props) => {
  const { actions, state } = usePlayer();

  const getParsedTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  };

  const renderPlayButton = (preview_url: string | null) =>
    preview_url ? (
      <button
        className={styles.playButton}
        onClick={() => {
          actions.play({
            id: track.id,
            src: preview_url,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
          });
        }}
      >
        <PlayIcon className={styles.playIcon} />
      </button>
    ) : null;

  return (
    <li
      className={`
        ${styles.root}
        ${track.preview_url !== null ? styles.playable : null}
        ${state.meta?.id === track.id ? styles.active : null}
      `}
    >
      <span className={styles.index}>{index}</span>

      <Image
        src={track.album.images[2].url}
        width={50}
        height={50}
        className={styles.albumImage}
        alt={`${track.album.name} album main image`}
      />

      <div>
        <p className={styles.name}>{track.name}</p>
        <p className={styles.artist}>
          {track.artists.map(
            (artist, index) =>
              artist.name + (index < track.artists.length - 1 ? ", " : "")
          )}
        </p>
      </div>

      <span className={styles.duration}>
        {getParsedTime(Math.floor(track.duration_ms / 1000))}
      </span>

      <div className={styles.actions}>
        {renderPlayButton(track.preview_url)}

        <a  
          href={track.external_urls.spotify}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon className={styles.linkIcon} />
        </a>
      </div>
    </li>
  );
};

export default Track;
