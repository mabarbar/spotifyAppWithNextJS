import React from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";

import usePlayer from "~/hooks/usePlayer.hook";

import styles from "./PlayButton.module.css";

const PlayButton = () => {
  const { state, actions } = usePlayer();

  const handleButtonClick = () => {
    state.playing ? actions.pause() : actions.play();
  };

  return (
    <button onClick={handleButtonClick} className={styles.button}>
      {state.playing ? (
        <PauseIcon className={styles.icon} />
      ) : (
        <PlayIcon className={styles.icon} />
      )}
    </button>
  );
};

export default PlayButton;
