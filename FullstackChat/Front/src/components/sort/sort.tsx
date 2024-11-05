import React from "react";
import styles from "./sort.module.scss";

const sortArr = ["новые", "популярные", "все"];

const Sort = () => {
  const [state, setState] = React.useState<number>(0);

  return (
    <div className={styles.root}>
      {sortArr.map((item, index) => (
        <span
          className={index == state ? styles.active : styles.category}
          key={index}
          onClick={() => setState(index)}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Sort;
