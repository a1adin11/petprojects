import React, { useEffect } from "react";

import Card from "../components/defaultComponents/Card/Card";
import axios from "axios";
import FavoritesEmpty from "../components/FavoritesEmpty/FavoritesEmpty";

const FavoritePage = ({
  favoriteItems,
  setFavoriteItems,
  favoriteItemsTwo,
  setFavoriteItemsTwo,
  onAddToCart,
  onAddToFavorite,
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/favorite")
      .then((res) => setFavoriteItems(res.data));
  }, [favoriteItemsTwo]);

  return (
    <div className="content">
      <div className="upCard">
        <h1>Закладки</h1>
      </div>
      {/* .......................................................... */}
      {console.log(favoriteItems.length)}
      {favoriteItems.length > 0 ? (
        <div className="Sneakers">
          {favoriteItems.map((obj) => (
            <Card
              id={obj.id}
              key={obj.id}
              name={obj.name}
              price={obj.price}
              url={obj.url}
              onPluse={(productItem) => onAddToCart(productItem)}
              onFavorite={(likedItem) => onAddToFavorite(likedItem)}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <FavoritesEmpty />
        
      )
      }
    </div>
  );
};

export default FavoritePage;
