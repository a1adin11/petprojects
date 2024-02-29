import React from "react";

import Card from "../components/defaultComponents/Card/Card";
import Slider from "../components/defaultComponents/Slider/Slider";

const SneakersPage = ({
  items,
  searchValue,
  setSearchValue,
  favoriteItems,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  readyLoading,
}) => {
  if (items.length === 0) return <>нет элементов</>;

  const renderItems = () => {
    const filtedItems = items.filter((obj) =>
      obj.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (readyLoading ? filtedItems : [...Array[8]]).map((item) => (
      <Card
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        url={item.ImageUrl}
        onPluse={(productItem) => onAddToCart(productItem)}
        onFavorite={(likedItem) => onAddToFavorite(likedItem)}
        isFavorite={favoriteItems.some(
          (obj) => Number(obj.id) === Number(item.id)
        )}
        loading={true}

        //some работает как find, только find возвращает true или udefinde, а some true или false
      />
    ));
  };

  return (
    <>
      <Slider />
      <div className="content">
        <div className="upCard">
          <h1>
            {searchValue
              ? `Поиск по запросу : "${searchValue}"`
              : "Все россовки"}
          </h1>
          <div className="Search">
            <img
              width={14.25}
              height={14.25}
              src="/image/props/search.svg"
              alt="Search"
            ></img>
            <input
              placeholder="Поиск..."
              onChange={onChangeSearchInput}
              value={searchValue}
            />
            {searchValue && (
              <svg
                onClick={() => {
                  setSearchValue("");
                }}
                className="close"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                  fill="#ff5252"
                />
              </svg>
            )}
          </div>
        </div>
        {/* .......................................................... */}
        <div className="Sneakers">{renderItems()}</div>
      </div>
    </>
  );
};

export default SneakersPage;
