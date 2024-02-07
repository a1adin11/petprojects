import React, { useState, useEffect } from "react";

import SneakersPage from "./pages/Sneakers.page";
import Header from "./components/defaultComponents/Header/Header";
import SideBord from "./components/sidebordComponents/SideBord/SideBord";
import Card from "./components/defaultComponents/Card/Card";
import axios from "axios";
import Slider from "./components/defaultComponents/Slider/Slider";
import { Route, Routes } from "react-router";
import FavoritePage from "./pages/Favorite.page";
import { logDOM } from "@testing-library/react";

function App() {
  const [isSideOpened, setOpened] = useState(false);

  const [items, setItems] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [cartItemsTwo, setCartItemsTwo] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [favoriteItems, setFavoriteItems] = useState([]);

  const [favoriteItemsTwo, setFavoriteItemsTwo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/items").then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((res) => {
      setCartItems(res.data);
    });
  }, [cartItemsTwo]);

  const onAddToCart = async (productItem) => {
    try {
      if (cartItems.find((obj) => obj.id === productItem.id)) {
        onRemoveToCart(productItem.id);
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/cart",
          productItem
        );

        setCartItems((prev) => [...prev, data]);

        setCartItemsTwo((prev) => [...prev, productItem]);

        if (cartItemsTwo.length > 50) {
          setCartItemsTwo([]);
        }
      }
    } catch (e) {
      alert(`ошибуа ${e}, не удалось добавить товар в корзину`);
    }
  };

  const onAddToFavorite = async (likedItem) => {
    try {
      if (favoriteItems.find((obj) => obj.id === likedItem.id)) {
        axios.delete(`http://localhost:3000/favorite/${likedItem.id}`);
        setFavoriteItems((prev) =>
          prev.filter((obj) => obj.id === !likedItem.id)
        );
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/favorite",
          likedItem
        );

        setFavoriteItems((prev) => [...prev, data]);

        setFavoriteItemsTwo((prev) => [...prev, likedItem]);

        if (cartItemsTwo.length > 50) {
          setFavoriteItemsTwo([]);
        }
      }
    } catch (e) {
      alert(`ошибуа ${e}, не удалось добавить товар в избранное`);
    }
  };

  const onRemoveToCart = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  // const openSideBar = () => {
  //   setOpened(!isSideOpened);
  // };

  return (
    <div className="wrapper">
      {isSideOpened ? (
        <SideBord
          items={cartItems}
          closeSideBar={() => setOpened(false)}
          onRemove={onRemoveToCart}
        />
      ) : null}
      <Header onClickCart={() => setOpened(true)} />
      <Routes>
        <Route
          path="/favorites"
          exact
          element={
            <FavoritePage
              favoriteItems={favoriteItems}
              setFavoriteItems={setFavoriteItems}
              favoriteItemsTwo={favoriteItemsTwo}
              setFavoriteItemsTwo={setFavoriteItemsTwo}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
        <Route
          path="/"
          exact
          element={
            <SneakersPage
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
