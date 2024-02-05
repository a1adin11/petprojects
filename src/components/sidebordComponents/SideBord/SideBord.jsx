import React from "react";
import CartItem from "../CartItem/CartItem";
import style from "./SideBord.module.scss";
import CardEmty from "../CardEmpty/CardEmty";
import axios from "axios";
import Slider from "../../defaultComponents/Slider/Slider";

const SideBord = ({ closeSideBar, onRemove, items = [] }) => {
  React.useEffect =
    (() => {
      axios.get("http://localhost:3000/cart");
    },
    []);

  return (
    <>
      <Slider />
      <div className={style.sideboard_shadow}>
        <div className={style.sideboard}>
          <div className={style.sideControl}>
            <h2>Корзина </h2>
            <img
              width={60}
              src="./image/props/burger.svg"
              alt=""
              onClick={closeSideBar}
            />
          </div>

          {items.length > 0 ? (
            <div className="sideBordWrapper">
              <div className={style.Items}>
                {items.map((obj) => (
                  <CartItem
                    ImageUrl={obj.url}
                    price={obj.price}
                    title={obj.name}
                    onClickClose={() => onRemove(obj.id)}
                  />
                ))}
              </div>

              <ul className={style.navControl}>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
                <li>
                  <button>
                    Оформить заказ
                    <img
                      className={style.strelka}
                      src="/image/props/strelka_buy.svg"
                      alt="заказать"
                    />
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <CardEmty onClickButton={closeSideBar} />
          )}
        </div>
      </div>
    </>
  );
};

export default SideBord;
