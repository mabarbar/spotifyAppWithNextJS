import type React from "react";

import Image from "next/image";

import styles from "./User.module.css";

interface Props {
  name: string;
  image: string;
  email: string;
  loading: boolean;
  logout: () => void;
}

export const User: React.FC<Props> = ({
  email,
  image,
  name,
  loading,
  logout,
}) => {
  return (
    <div className={styles.root}>
      {!loading && (
        <>
          <div className={styles.user}>
            <div>
              {image ? (
                <Image
                  className={styles.image}
                  src={image}
                  alt=""
                  width={40}
                  height={40}
                />
              ) : (
                <span className={`${styles.image} ${styles.placeholder}`} />
              )}
            </div>
            <div className={styles.details}>
              <p className={styles.name}>{name}</p>
              <p className={styles.email}>{email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="relative ml-3 inline-flex items-center h-fit rounded-md border-2 border-ui4  bg-ui8 px-4 py-2 text-sm font-medium text-text shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-ui4 focus:ring-offset-2 focus:ring-offset-primary transition-colors ease-linear"
          >
            Wyloguj
          </button>
        </>
      )}
    </div>
  );
};

export default User;
