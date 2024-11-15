import React from "react";
import styles from "./header.module.scss";
const header = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <img src="src/assets/systemImg/logo.svg" alt="logo" />
        <span>LinkUp</span>
      </div>
      <div className={styles.profile}>
        <img src="src/assets/utilsIcon/userDefaultImg.svg" alt="userLogo" />
        <div className={styles.options}>
          <button onClick={() => setIsVisible(!isVisible)}>
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.10156 8.18652C0.867188 8.44694 0.75 8.74642 0.75 9.08496C0.75 9.4235 0.867188 9.72298 1.10156 9.9834L8.60156 17.4834C8.86198 17.7178 9.16146 17.835 9.5 17.835C9.83854 17.835 10.138 17.7178 10.3984 17.4834C10.6328 17.223 10.75 16.9235 10.75 16.585C10.75 16.2464 10.6328 15.9469 10.3984 15.6865L3.75781 9.08496L10.3984 2.4834C10.6328 2.22298 10.75 1.9235 10.75 1.58496C10.75 1.24642 10.6328 0.94694 10.3984 0.686523C10.138 0.452148 9.83854 0.334961 9.5 0.334961C9.16146 0.334961 8.86198 0.452148 8.60156 0.686523L1.10156 8.18652Z"
                fill="black"
              />
            </svg>
          </button>
          <ul
            className={
              isVisible == true ? styles.itemsVisible : styles.itemsInvisible
            }
          >
            <li>Настройки</li>
            <li>Мой профиль</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default header;
