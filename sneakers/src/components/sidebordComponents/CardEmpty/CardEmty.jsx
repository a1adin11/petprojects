import React from "react";

import style from "./CartEmpty.module.scss";

const CardEmty = (props) => {
  return (
    <div className={style.CartEmpty}>
      <img width={120} height={120} src="./image/SideBord/EmptyBox.png" alt="Пусто(((" />
      <h1>Корзина пуста</h1>
      <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      <button className={style.ExitButton} onClick={props.onClickButton}>
        <img className={style.ReversStrelka} src="./image/SideBord/ReversStrelka.png" alt="назад" /> 
        Вернуться назад
      </button>
    </div>
  );
};

export default CardEmty;
