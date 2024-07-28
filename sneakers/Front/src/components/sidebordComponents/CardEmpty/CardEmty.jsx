import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./CartEmpty.module.scss";
import { AppContext } from "../../../App";

const CardEmty = ({ title, description, img, onClick }) => {
  const { setOpened } = useContext(AppContext);
  return (
    <div className={style.CartEmpty}>
      <img width={170} height={170} src={img} alt="Пусто(((" />
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/">
        <button className={style.ExitButton} onClick={onClick}>
          <img
            className={style.ReversStrelka}
            src="./image/SideBord/ReversStrelka.png"
            alt="назад"
          />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
};

export default CardEmty;
