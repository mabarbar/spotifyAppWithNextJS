import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import useSpotify from "~/hooks/useSpotify.hook";
import Image from "next/image";
import { motion } from "framer-motion";

interface SearchProps {
  open: boolean;
  onClose: () => void;
  selectPlaylist: (id: string) => void;
}

const wrapperAnimation = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const playlistsWrapper = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
};

type Playlist = Partial<SpotifyApi.PlaylistBaseObject>;

const Search = ({ open, onClose, selectPlaylist }: SearchProps) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Playlist[]>([]);
  const parentRef = useRef(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const closeOnParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === parentRef.current) {
      onClose();
    }
  };

  const handleSelect = (id: string) => {
    selectPlaylist(id);
    onClose();
  };

  const { ready, client } = useSpotify();

  useEffect(() => {
    setResult([])
    setValue("")
  }, [open])

  useEffect(() => {
    if (!value) return setValue("");
    if (!ready) return;
    client.searchPlaylists(value, { limit: 8 }).then(
      (data: any) => {
        if (!data.body) return setResult([]);
        setResult(data.body.playlists?.items);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }, [client, ready, value]);

  console.log(result);

  return (
    <>
      {open ? (
        <div className="relative z-50">
          <motion.div
            variants={wrapperAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.background}
            ref={parentRef}
            onClick={closeOnParentClick}
          >
            <div className={styles.inputWrapper}>
              <MagnifyingGlassIcon className={styles.icon} aria-hidden="true" />
              <input
                className={styles.input}
                type="text"
                placeholder="Szukaj..."
                onChange={debounce(handleOnChange, 400)}
              />
            </div>
            <motion.div
              variants={playlistsWrapper}
              initial="hidden"
              animate={"visible"}
              className={styles.playlistWrapper}
            >
              {result.length > 0 ? (
                <>
                  {result.map((el) => (
                    <motion.div
                      className={styles.playlist}
                      key={el.id}
                      variants={itemVariants}
                      initial="hidden"
                      onClick={() => handleSelect(el.id || "")}
                    >
                      {el.images?.[0].url ? (
                        <Image
                          src={el.images?.[0].url}
                          alt=""
                          width={40}
                          height={40}
                          loading={"eager"}
                        />
                      ) : null}

                      <p className="text-sm p-4 overflow-hidden">{el.name}</p>
                    </motion.div>
                  ))}
                </>
              ) : null}
              {result.length === 0 && value !== "" ? (
                <motion.p
                  variants={itemVariants}
                  initial="hidden"
                  className="p-4"
                >
                  Nie odnaleziono playlist, spróbuj ponownie.
                </motion.p>
              ) : null}
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default Search;