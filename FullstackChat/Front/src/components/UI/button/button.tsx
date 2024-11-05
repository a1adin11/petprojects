import { FC, PropsWithChildren } from "react";
import styles from "./button.module.scss";
import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  width?: string | number;
  height?: string | number;
  margin?: string | number;
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button type="submit"
      style={{ width: props.width, height: props.height, marginTop: props.margin }}
      className={styles.root}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
