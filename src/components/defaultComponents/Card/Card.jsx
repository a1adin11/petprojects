import React from "react";
import style from "./Card.module.scss";

const Card = ({ onPluse, onFavorite, url, name, price }) => {
  const [isChecked, setChecked] = React.useState(false);
  const [isCheckedFavorite, setisCheckedFavorite] = React.useState(false);

  const onClickPlus = () => {
    setChecked(!isChecked);
    onPluse({ url, name, price });
  };

  const isChackedFavorite = () => {
    onFavorite({ url, name, price });
    setisCheckedFavorite(!isCheckedFavorite);
  };

  return (
    <div className={style.card}>
      <div className={style.favorit} onClick={isChackedFavorite}>
        <img
          src={
            isCheckedFavorite
              ? "/image/props/heart-liked.svg"
              : "/image/props/heart-unliked.svg"
          }
          alt="unliked"
        />
      </div>
      <img width={133} height={112} src={url} alt="Кросовки" />
      <h5>{name}</h5>
      <div className={style.cardBottom}>
        <div className={style.cardCost}>
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          className={style.button}
          width={17}
          height={17}
          alt="Plus"
          src={
            isChecked ? "/image/props/added.svg" : "/image/props/not-added.svg"
          }
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
};

export default Card;
