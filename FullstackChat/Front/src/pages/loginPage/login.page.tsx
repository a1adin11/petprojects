import { Link } from "react-router-dom";
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import styles from "./login.page.module.scss";
import logo from "../../assets/systemImg/bigLogo.svg";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IRequestLogin } from "../../types";
import { loginSchema } from "../../components/validations/login.schema";
import { useLoginUserMutation } from "../../redux/api";

const loginPage = () => {
  const [loginUser, { error }] = useLoginUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IRequestLogin> = async (data) => {
    console.log(data);
    await loginUser({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((response) => {
        console.log(response);

        navigate("/");
      })
      .catch((rejected) => {
        if (rejected && "data" in rejected) {
          alert(rejected.data.message);
        } else {
          console.error("Ошибка авторизации", error);
          alert("Произошла ошибка при авторизации");
        }
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftPart}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <span>LinkUp</span>
        </div>
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formItem}>
            <label>E-mail:</label>
            <Input
              {...register("email")}
              placeholder="Email"
              errorList={errors?.email?.message}
            />
          </div>
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
          <div className={styles.formItem}>
            <label>Пароль:</label>
            <Input
              {...register("password")}
              placeholder="Password"
              errorList={errors?.email?.message}
              isPassword={true}
            />
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
          <Button
            width={310}
            height={60}
            margin={30}
            children="Войти"
            type="submit"
          />
        </form>
        <p>Ещё не зарегистрированы?</p>
        <Link to={"/auth/register"}>
          <span>Зарегистрироваться</span>
        </Link>
      </div>
    </div>
  );
};

export default loginPage;
