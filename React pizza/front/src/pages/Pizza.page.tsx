import { useEffect } from "react";

import PizzaBlock from "../components_TS/PizzaBlock/PizzaBlock";
import Categories from "../components_TS/Categories";
import Sort from "../components_TS/Sort";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";
import { useGetAllPizzasQuery } from "../API/api";
import { IPizzaItem } from "../redux/slices/pizzaSlice";
import React from "react";

const PizzaPage = () => {
  const dispatch = useDispatch();
  //FIXME: сделать плюшку с usrRef на input
  // const inputRef = React.createRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const searchValue = useSelector(
    (state: RootState) => state.filterState.searchValue
  );

  const category = useSelector(
    (state: RootState) => state.filterState.filterItem
  );

  const sotr = useSelector((state: RootState) => state.filterState.sortItem);

  const { data: itemsResponse = [], isLoading } = useGetAllPizzasQuery({
    category: category.value == 0 ? "" : category.value,
    _sort: sotr.property,
  });

  const items = useSelector((state: RootState) => state.pizzaItems.pizzaItems);

  const filteredItems: IPizzaItem[] = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__middle">
        <h2 className="content__title">
          {searchValue ? `По запросу: ${searchValue}` : "Все пиццы"}
        </h2>
        <div className="content__search">
          <img width={18.25} src="image/Props/search.svg" alt="" />
          <input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
            }}
          />
          {searchValue && (
            <svg
              onClick={() => dispatch(setSearchValue(""))}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
            >
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          )}
        </div>
      </div>
      <div className="content__items">
        {/* тут магия с фильтрацией наёбывается, так что нужно починить */}
        {(searchValue ? filteredItems : items).map((item) => (
          <PizzaBlock {...item} isLoadingReady={isLoading} key={item.title} />
        ))}
      </div>
    </div>
  );
};

export default PizzaPage;
