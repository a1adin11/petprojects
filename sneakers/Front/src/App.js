import React, { useState, useEffect, createContext } from "react";

import SneakersPage from "./pages/Sneakers.page";
import Header from "./components/defaultComponents/Header/Header";
import SideBord from "./components/sidebordComponents/SideBord/SideBord";
import Card from "./components/defaultComponents/Card/Card";
import axios from "axios";
import Slider from "./components/defaultComponents/Slider/Slider";
import { Route, Routes } from "react-router";
import FavoritePage from "./pages/Favorite.page";
import { logDOM } from "@testing-library/react";

export const AppContext = createContext({});

function App() {
  const [isSideOpened, setOpened] = useState(false);

  const [items, setItems] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [cartItemsTwo, setCartItemsTwo] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [favoriteItems, setFavoriteItems] = useState([]);

  const [favoriteItemsTwo, setFavoriteItemsTwo] = useState([]);

  const [isLoadingReady, setIsLoadingReady] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => Number(item.price.replaceAll(/\D/g, "")) + sum, 0) + " руб.";


  useEffect(() => {
    async function fetchData() {
      setIsLoadingReady(false);
      const favoriteResponse = await axios.get(
        "http://localhost:3000/favorite"
      );
      const cartResponse = await axios.get("http://localhost:3000/cart");
      const itemsResponse = await axios.get("http://localhost:3000/items");

      setFavoriteItems(favoriteResponse.data);
      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);

      setIsLoadingReady(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((res) => {
      setCartItems(res.data);
    });
  }, [cartItemsTwo]);

  const onAddToCart = async (productItem) => {
    try {
      if (cartItems.find((obj) => Number(obj.id) === Number(productItem.id))) {
        onRemoveToCart(Number(productItem.id));
        setCartItemsTwo((prev) =>
          prev.filter((obj) => Number(obj.id) !== Number(productItem.id))
        );
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
      console.log(productItem);
    } catch (e) {
      alert(`ошибуа ${e}, не удалось добавить товар в корзину`);
    }
  };

  const onAddToFavorite = async (likedItem) => {
    try {
      console.log(likedItem.id);
      console.log(favoriteItems);
      if (
        favoriteItems.find((obj) => Number(obj.id) === Number(likedItem.id))
      ) {
        axios.delete(`http://localhost:3000/favorite/${likedItem.id}`);
        setFavoriteItems((prev) =>
          prev.filter((obj) => Number(obj.id) !== Number(likedItem.id))
        );
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/favorite",
          likedItem
        );

        setFavoriteItems((prev) => [...prev, data]);

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
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  // const openSideBar = () => {
  //   setOpened(!isSideOpened);
  // };

  const isAddedItem = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        setCartItems,
        favoriteItems,
        isAddedItem,
        onAddToCart,
        onAddToFavorite,
        setOpened,
        totalPrice,
      }}
    >
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
                favoriteItems={favoriteItems}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                cartItems={cartItems}
                readyLoading={isLoadingReady}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
