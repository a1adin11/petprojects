import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPizzaFilterState } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const Categories = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const dispatch = useDispatch();
  const curentSort = useSelector(
    (state: RootState) => state.filterState.filterItem
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((text, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(
                setPizzaFilterState({
                  text: text,
                  value: index,
                })
              );
            }}
            className={curentSort.value === index ? "active" : ""}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
