import React, { useRef, useState, MouseEvent, useEffect } from "react";
import styles from "./ProgressBar.module.css";
import Draggable from "react-draggable";
import usePlayer from "~/hooks/usePlayer.hook";

const ProgressBar = () => {
  const { state, actions } = usePlayer();
  const [progress, setProgress] = useState(state.progress);
  const [currentTime, setCurrentTime] = useState(state.currentTime);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [drag, setDrag] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

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

  const getIndicatorXPosition = (percentOffset: number): number => {
    if (rootRef.current) {
      return rootRef.current?.offsetWidth * percentOffset;
    }

    return 0;
  };

  const getNewProgress = (dragXPosition: number): number => {
    if (rootRef.current) {
      return dragXPosition / rootRef.current?.offsetWidth;
    }

    return 0;
  };

  const onIndicatorDragStart = () => {
    setDrag(true);

    setWasPlaying(state.playing);
    actions?.pause();
  };

  const onIndicatorDragStop = (dragXPosition: number) => {
    const newProgress = getNewProgress(dragXPosition);
    actions.seek(state.duration * newProgress);

    setTimeout(() => setDrag(false), 50);
    if (wasPlaying) {
      actions?.play();
    }
  };

  const onIndicatorDrag = (dragXPosition: number) => {
    const newProgress = getNewProgress(dragXPosition);

    setCurrentTime(Math.floor(state.duration * newProgress));
    setProgress(newProgress);
  };

  const onBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (rootRef.current && !drag) {
      const target = e.target as HTMLElement;
      const newProgress =
        (e.clientX - target.getBoundingClientRect().left) /
        rootRef.current?.offsetWidth;

      actions.seek(state.duration * newProgress);
    }
  };

  useEffect(() => {
    setProgress(state.progress);
  }, [state.progress]);

  useEffect(() => {
    setCurrentTime(state.currentTime);
  }, [state.currentTime]);

  return (
    <div className={styles.root}>
      <div
        className={styles.progressContainer}
        ref={rootRef}
        onClick={(e) => onBarClick(e)}
      >
        <div
          className={styles.progress}
          style={{ width: `${progress * 100}%` }}
        />
        <Draggable
          nodeRef={nodeRef}
          bounds="parent"
          axis="x"
          position={{ x: getIndicatorXPosition(progress), y: -6 }}
          onStart={() => onIndicatorDragStart()}
          onStop={(e, data) => onIndicatorDragStop(data.x)}
          onDrag={(e, data) => onIndicatorDrag(data.x)}
        >
          <div className={styles.indicator} ref={nodeRef} />
        </Draggable>
      </div>
      <div className={styles.timer}>
        {getParsedTime(currentTime)} / {getParsedTime(state.duration)}
      </div>
    </div>
  );
};

export default ProgressBar;
