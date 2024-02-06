import React, { useState, useEffect } from "react";

import SneakersPage from "./pages/Sneakers.page";
import Header from "./components/defaultComponents/Header/Header";
import SideBord from "./components/sidebordComponents/SideBord/SideBord";
import Card from "./components/defaultComponents/Card/Card";
import axios from "axios";
import Slider from "./components/defaultComponents/Slider/Slider";
import { Route, Routes } from "react-router";
import FavoritePage from "./pages/Favorite.page";

function App() {
  const [isSideOpened, setOpened] = useState(false);

  const [items, setItems] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [cartItemsTwo, setCartItemsTwo] = useState([]);

  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    console.log("Effect is working");

    axios.get("http://localhost:3000/items").then((res) => {
      setItems(res.data);
    });

  }, []);

    

  useEffect(() => {

    axios.get("http://localhost:3000/cart").then((res) => {
      setCartItems(res.data);
      
    });
  }, [cartItemsTwo]);

  const onAddToCart = (productItem) => {
    axios.post("http://localhost:3000/cart", productItem);

    setCartItems((prev) => [...prev, productItem]);

    setCartItemsTwo((prev) => [...prev, productItem]);
  };

  const onAddToFavorite = (likedItem) => {
    axios.post("http://localhost:3000/favorite", likedItem);

    setFavoriteItems((prev) => [...prev, likedItem]);
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
        <Route path="/favorites" element={<FavoritePage />}/>
        <Route path="/sneakers" element={<SneakersPage
          items = {items}
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
          onChangeSearchInput = {onChangeSearchInput}
          onAddToCart = {onAddToCart}
          onAddToFavorite = {onAddToFavorite} 
        />}/>
      </Routes>
     
    </div>
  );
}

export default App;
