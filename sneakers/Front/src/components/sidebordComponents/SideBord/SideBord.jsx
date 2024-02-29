import React, { useContext, useState } from "react";
import CartItem from "../CartItem/CartItem";
import style from "./SideBord.module.scss";
import CardEmty from "../CardEmpty/CardEmty";
import axios from "axios";
import { AppContext } from "../../../App";

const SideBord = ({ closeSideBar, onRemove, items = [] }) => {
  const { setOpened, setCartItems, cartItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/orders", {
        items: cartItems,
      });
      console.log(response);
      setOrderId(response.data.id);
      setIsOrderComplete(true);
      await cartItems.map((item) =>
        axios.delete(`http://localhost:3000/cart/${item.id}`)
      );
      // или await axios.put("http://localhost:3000/orders", {
      //   items: cartItems,
      // });
      setCartItems([]);
    } catch (e) {
      alert(`Ошибка ${e}, Заказ не был принят :(`);
    }
    setIsLoading(false);
  };

  return (
    <>
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
                    key={obj.id}
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
                  <button disabled={isLoading} onClick={onClickOrder}>
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
            <CardEmty
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={
                isOrderComplete
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              }
              img={
                isOrderComplete
                  ? "./image/SideBord/OrderComplete.svg"
                  : "./image/SideBord/EmptyBox.png"
              }
              onClick={() => {
                setOpened(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideBord;
