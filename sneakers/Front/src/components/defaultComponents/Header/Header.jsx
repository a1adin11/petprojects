import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <Link to={"/"} style={{ textDecoration: "none", color: '#000' }}>
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
              <b>1205 руб.</b>
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
