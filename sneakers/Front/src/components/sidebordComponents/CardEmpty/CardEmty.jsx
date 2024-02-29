import React, { useContext } from "react";

import style from "./CartEmpty.module.scss";
import { AppContext } from "../../../App";

const CardEmty = ({ title, description, img, onClick }) => {
  const { setOpened } = useContext(AppContext);
  return (
    <div className={style.CartEmpty}>
      <img width={170} height={170} src={img} alt="Пусто(((" />
      <h1>{title}</h1>
      <p>{description}</p>
      <button className={style.ExitButton} onClick={onClick}>
        <img
          className={style.ReversStrelka}
          src="./image/SideBord/ReversStrelka.png"
          alt="назад"
        />
        Вернуться назад
      </button>
    </div>
  );
};

export default CardEmty;
