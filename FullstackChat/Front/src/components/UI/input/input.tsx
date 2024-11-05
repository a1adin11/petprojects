import { FC, forwardRef } from "react";
import styles from "./input.module.scss";
import React from "react";
// import { useController } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  errorList: string | undefined;
  isPassword?: boolean;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ isPassword, errorList, ...props }: InputProps, ref) => {
    const openEye = "/src/assets/systemImg/openEye.svg";
    const closeEye = "/src/assets/systemImg/closeEye.svg";

    // const { field: { ref: inputRef, ...registerOptions } } = useController({
    //   name,
    //   control,
    //   defaultValue: "",
    // });

    const [showPassword, setShowPassword] = React.useState<boolean>(
      isPassword ? false : true
    );

    return (
      <div className={styles.root}>
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={errorList ? styles.errors : styles.normal}
          {...props}
        />
        {isPassword && (
          <img
            className={styles.passwordEye}
            src={showPassword ? openEye : closeEye}
            alt="passwordEye"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        {errorList && <span className={styles.errorField}>{errorList}</span>}
      </div>
    );
  }
);

export default Input;
