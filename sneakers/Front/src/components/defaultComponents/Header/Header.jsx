import React, { useContext } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App";



const Header = (props) => {

  const { totalPrice } = useContext(AppContext);

  

  return (
    <header>
      <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
        <div className={style.headerLeft}>
          <img src="/image/logo.png" alt="Logo" width={40} height={40} />
          <div className={style.headerInfo}>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className={style.headerRight}>
          <li onClick={props.onClickCart}>
            <img src="/image/props/Korzina.svg" alt="Корзина" />
            <span>
              <b>{totalPrice}</b>
            </span>
          </li>
          <li>
            <Link to={"/favorites"} style={{ textDecoration: "none" }}>
              <img src="/image/props/heart.svg" alt="Закладки" />
              <span>Закладки</span>
            </Link>
          </li>
          <li>
            <Link to={"/profil"} style={{ textDecoration: "none" }}>
              <img src="/image/props/User.svg" alt="Пользователь" />
              <span>Профиль</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
