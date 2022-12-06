import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { DEFAULT_CARD_COLOR } from "~/config/common.config";
import { Model } from "~/models/Playlist.model";

import {
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import styles from "./Form.module.css";
import useSpotify from "~/hooks/useSpotify.hook";
import { Response as CreatedPlaylist } from "~/pages/api/playlist/[id]";
import { useList } from "~/hooks/useList.hook";
import Search from "~/components/Search/Search.component";

type FormData = Model;

interface Props {
  children?: React.ReactNode;
}

export const Form: React.FC<Props> = ({}) => {
  const { me } = useSpotify();
  const { mutate } = useList({
    limit: 0,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      owner: me?.display_name || "",
      slug: "",
      spotifyId: "",
      color: DEFAULT_CARD_COLOR,
    },
  });

  const [loading, setLoading] = React.useState(false);

  const [searchOpen, setSearchOpen] = React.useState(false);

  const createSlug = (name: string) => {
    const arr = name.toLowerCase().split(" ");
    if (arr.length > 1) {
      if (arr.length > 5) {
        return arr.slice(0, 5).join("-");
      }
      return arr.join("-");
    } else {
      return arr[0];
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!me?.display_name) return;
    setValue("owner", me.display_name);
  }, [me, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    data.slug = createSlug(data.name);
    try {
      console.log(data);
      setLoading(true);
      const response: Response = await fetch("/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`ERROR STATUS: ${response.status}`);
      }
      const result: CreatedPlaylist = await response.json();
      setLoading(false);
      mutate();
      reset({
        name: "",
        slug: "",
        color: "#000000",
        spotifyId: "",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className={styles.root}>
        <form onSubmit={onSubmit}>
          <div className="mt-3">
            <div className={styles.info}>
              <label className={styles.label}>Nazwa playlisty</label>
              {errors.name && (
                <span className={styles.error}>Pole wymagane</span>
              )}
            </div>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="off"
                className={styles.input}
                {...register("name", { required: true, maxLength: 60 })}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className={styles.info}>
              <label className={styles.label}>Nazwa dodającego</label>
              {errors.owner && (
                <span className={styles.error}>Pole wymagane</span>
              )}
            </div>
            <div className="mt-1">
              <input
                type="text"
                autoComplete="off"
                className={styles.input}
                {...register("owner", { required: true, maxLength: 60 })}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className={styles.info}>
              <label className={styles.label}>Id playlisty na Spotify</label>
              {errors.spotifyId && (
                <span className={styles.error}>Pole wymagane</span>
              )}
            </div>

            <div className={styles.search}>
              <div className={styles.searchWrapper}>
                <div className={styles.searchIconWrapper}>
                  <BarsArrowDownIcon
                    className={styles.searchIcon}
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  autoComplete="off"
                  {...register("spotifyId", { required: true, maxLength: 30 })}
                  className={styles.searchInput}
                />
                <button
                  type="button"
                  className={styles.searchButton}
                  onClick={() => setSearchOpen(true)}
                >
                  <MagnifyingGlassIcon
                    className={styles.searchIcon}
                    aria-hidden="true"
                  />
                  <span>Szukaj</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className={styles.info}>
              <label className={styles.label}>Kolor</label>
              {errors.color && (
                <span className={styles.error}>Kolor musi być w hexie</span>
              )}
            </div>

            <div className="mt-1">
              <input
                type="text"
                autoComplete="off"
                className={styles.input}
                {...register("color", {
                  pattern: RegExp("\\#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"),
                })}
              />
            </div>
          </div>

          <div className="mt-12 mb-4">
            <button className={styles.button} type="submit">
              Dodaj playlistę
              {loading && <span className={styles.loading}>Wysyłam...</span>}
            </button>
          </div>
        </form>
      </div>
      <Search
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        selectPlaylist={(id) => setValue("spotifyId", id)}
      />
    </>
  );
};

export default Form;
