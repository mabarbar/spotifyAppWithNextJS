import React, { PropsWithChildren, useMemo, useReducer, useRef } from "react";

enum PlayerAction {
  SET_META = "PLAYER_SET_META",
  PLAY = "PLAYER_PLAY",
  PAUSE = "PLAYER_PAUSE",
  SET_PROGRESS = "PLAYER_SET_PROGRESS",
  SET_CURRENT_TIME = "PLAYER_SET_CURRENT_TIME",
  SET_DURATION = "PLAYER_SET_DURATION",
  MUTE = "PLAYER_MUTE",
  UNMUTE = "PLAYER_UNMUTE",
}

interface Action {
  type: PlayerAction;
  payload?: any;
}

interface Meta {
  id?: string;
  src?: string;
  name?: string;
  artists?: string[];
}

interface State {
  meta?: Meta;
  playing: boolean;
  currentTime: number;
  progress: number;
  duration: number;
  muted: boolean;
}

interface Actions {
  play: (meta?: Meta) => void;
  pause: () => void;
  seek: (time: number) => void;
  mute: () => void;
  unmute: () => void;
}

const initialState: State = {
  playing: false,
  currentTime: 0,
  progress: 0,
  duration: 0,
  muted: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case PlayerAction.SET_META: {
      return { ...state, meta: action.payload };
    }

    case PlayerAction.PLAY: {
      return { ...state, playing: true };
    }

    case PlayerAction.PAUSE: {
      return { ...state, playing: false };
    }

    case PlayerAction.SET_CURRENT_TIME: {
      return {
        ...state,
        currentTime: action.payload,
      };
    }

    case PlayerAction.SET_PROGRESS: {
      return {
        ...state,
        progress: action.payload,
      };
    }

    case PlayerAction.SET_DURATION: {
      return {
        ...state,
        duration: action.payload,
      };
    }

    case PlayerAction.MUTE: {
      return { ...state, muted: true };
    }

    case PlayerAction.UNMUTE: {
      return { ...state, muted: false };
    }

    default:
      return initialState;
  }
};

export const PlayerContext = React.createContext<{
  state: State;
  actions: Actions;
} | null>(null);

export const PlayerProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => state);
  const playerRef = useRef<HTMLAudioElement>(null);

  const actions = useMemo(
    () => ({
      play(meta?: Meta) {
        if (playerRef.current) {
          dispatch({ type: PlayerAction.PLAY });

          if (meta) {
            dispatch({ type: PlayerAction.SET_META, payload: meta });

            if (meta.src && playerRef.current.currentSrc !== meta.src) {
              playerRef.current.src = meta.src;
              playerRef.current.load();
              playerRef.current.pause();
              playerRef.current.currentTime = 0;
            }
          }

          playerRef.current.play();
        }
      },
      pause: () => {
        if (playerRef.current) {
          dispatch({ type: PlayerAction.PAUSE });
          playerRef.current?.pause();
        }
      },
      seek: (time: number) => {
        if (playerRef.current) {
          playerRef.current.currentTime = time;
        }
      },
      mute: () => {
        if (playerRef.current) {
          dispatch({ type: PlayerAction.MUTE });
          playerRef.current.muted = true;
        }
      },
      unmute: () => {
        if (playerRef.current) {
          dispatch({ type: PlayerAction.UNMUTE });
          playerRef.current.muted = false;
        }
      },
    }),
    []
  );

  const value = React.useMemo(() => ({ state, actions }), [state, actions]);

  return (
    <>
      <PlayerContext.Provider value={value} {...props} />
      <audio
        ref={playerRef}
        onPlay={() => {
          dispatch({ type: PlayerAction.PLAY });
        }}
        onPause={() => {
          dispatch({ type: PlayerAction.PAUSE });
        }}
        onTimeUpdate={() => {
          if (playerRef.current) {
            dispatch({
              type: PlayerAction.SET_CURRENT_TIME,
              payload: Math.floor(playerRef.current.currentTime),
            });

            dispatch({
              type: PlayerAction.SET_PROGRESS,
              payload:
                playerRef.current.currentTime / playerRef.current.duration,
            });
          }
        }}
        onDurationChange={() => {
          if (playerRef.current) {
            dispatch({
              type: PlayerAction.SET_DURATION,
              payload: Math.floor(playerRef.current.duration),
            });
          }
        }}
      />
    </>
  );
};
