import React from "react";
import style from "./Slider.module.scss";

const Slider = (props) => {
  return (
    <div className={style.slider}>
      <img className={style.adidasLogo} src="./image/Slider/adidasLogo.png" />
      <img className={style.frog} src="./image/Slider/imgSlider.png" />
      <div className={style.paragraph}>
        <h1>
          <b>Stan Smith</b>, Forever!
        </h1>
      </div>
      <button>КУПИТЬ</button>
    </div>
  );
};

export default Slider;
