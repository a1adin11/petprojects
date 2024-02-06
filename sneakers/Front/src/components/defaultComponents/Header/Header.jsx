import React from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div className={style.headerLeft}>
        {/* <Link to={"/sneakers"}> */}
        <img src="/image/logo.png" alt="Logo" width={40} height={40} />
        <div className={style.headerInfo}>
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
        {/* </Link> */}
      </div>
      <div>
        <ul className={style.headerRight}>
          <li onClick={props.onClickCart}>
            <img src="/image/props/Korzina.svg" alt="Корзина" />
            <span>
              <b>1205 руб.</b>
            </span>
          </li>
          <li>
            {/* <Link to={'/favorites'}> */}
            <img src="/image/props/heart.svg" alt="Закладки" />
            <span>Закладки</span>
            {/* </Link> */}
          </li>
          <li>
            <img src="/image/props/User.svg" alt="Пользователь" />
            <span>Профиль</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
