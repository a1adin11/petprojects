import React from "react";
import style from "./FavoritesEmpty.module.scss";

const FavoritesEmpty = () => {
  return (
    <div className={style.wrapper}>
      <img
        width={70}
        height={70}
        src="./image/Slider/emptyFavorite.png"
        alt="пусто ((("
      />
      <div className={style.textBlock}>
        <h1>Закладок нет :(</h1>
        <p>Вы ничего не добавляли в закладки</p>
      </div>
      <button className={style.ExitButton}>
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

export default FavoritesEmpty;
