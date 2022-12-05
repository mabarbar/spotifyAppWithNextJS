import type React from "react";
import usePlayer from "~/hooks/usePlayer.hook";
import {
  PlayButton,
  SoundButton,
  ProgressBar,
} from "~/components/Player/components";
import styles from "./Player.module.css";

export const Player = () => {
  const { state } = usePlayer();

  const getArtists = (artists?: string[]) =>
    artists?.map(
      (artist, index) => artist + (index < artists?.length - 1 ? ", " : "")
    );

  return state.meta?.src ? (
    <div className={styles.root}>
      <div className={styles.player}>
        <PlayButton />

        <div className="w-full">
          <p className={styles.trackName}>{state.meta?.name} </p>
          <ProgressBar />
          <p className={styles.trackAuthor}>{getArtists(state.meta.artists)}</p>
        </div>

        <SoundButton />
      </div>

      <div className={styles.trackInfo}></div>
    </div>
  ) : null;
};

export default Player;
