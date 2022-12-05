import React from "react";
import usePlayer from "~/hooks/usePlayer.hook";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import styles from "./SoundButton.module.css";

const SoundButton = () => {
  const { state, actions } = usePlayer();

  const handleButtonClick = () => {
    state.muted ? actions.unmute() : actions.mute();
  };

  return (
    <button className={styles.button} onClick={handleButtonClick}>
      {state.muted ? (
        <SpeakerXMarkIcon className={styles.icon} />
      ) : (
        <SpeakerWaveIcon className={styles.icon} />
      )}
    </button>
  );
};

export default SoundButton;
