import React, { useContext, useEffect } from "react";

import Card from "../components/defaultComponents/Card/Card";
import axios from "axios";
import FavoritesEmpty from "../components/FavoritesEmpty/FavoritesEmpty";
import { AppContext } from "../App";
import CardEmty from "../components/sidebordComponents/CardEmpty/CardEmty";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const FavoritePage = ({}) => {
  const { favoriteItems, onAddToCart, onAddToFavorite } =
    useContext(AppContext);

  return (
    <div className="content">
      {favoriteItems.length > 0 ? (
        <>
          <div className="upCard">
            <h1>Закладки</h1>
          </div>
          {/* .......................................................... */}
          {console.log(favoriteItems.length)}

          <div className="Sneakers">
            {favoriteItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                url={item.url}
                onPluse={(productItem) => onAddToCart(productItem)}
                onFavorite={(likedItem) => onAddToFavorite(likedItem)}
                isFavorite={true}
                loading
              />
            ))}
          </div>
        </>
      ) : (
        <CardEmty
          img={"./image/Slider/emptyFavorite.png"}
          title={"Закладок нет :"}
          description={"Вы ничего не добавляли в закладки"}
          onClick={keyboard}
        />
      )}
    </div>
  );
};

export default FavoritePage;
