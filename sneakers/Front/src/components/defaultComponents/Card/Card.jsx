import React, { useEffect, useContext, useState } from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../../App";

import style from "./Card.module.scss";

const Card = ({
  onPluse,
  onFavorite,
  url,
  name,
  price,
  isFavorite = false,
  id,
  loading,
}) => {
  const { isAddedItem } = useContext(AppContext);

  const [isCheckedFavorite, setisCheckedFavorite] = useState(isFavorite);

  const onClickPlus = () => {
    onPluse({ url, name, price, id });
  };

  const isChackedFavorite = () => {
    onFavorite({ url, name, price, id });
    setisCheckedFavorite(!isCheckedFavorite);
  };

  return (
    <div className={style.card}>
      {loading ? (
        <>
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
                isAddedItem(id)
                  ? "/image/props/added.svg"
                  : "/image/props/not-added.svg"
              }
              onClick={onClickPlus}
            />
          </div>
        </>
      ) : (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="103" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="124" rx="3" ry="3" width="93" height="15" />
          <rect x="114" y="156" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="165" rx="3" ry="3" width="80" height="24" />
        </ContentLoader>
      )}
    </div>
  );
};

export default Card;
