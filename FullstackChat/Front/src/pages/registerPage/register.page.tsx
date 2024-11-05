import styles from "./register.page.module.scss";
import logo from "../../assets/systemImg/bigLogo.svg";
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/button/button";

import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRequestRegister } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../../redux/api";
import { registerSchema } from "../../components/validations/register.schema";

const RegisterPage = () => {
  const [registerUser, { error }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestRegister>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IRequestRegister> = async (data) => {
    console.log(data);
    await registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
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
          console.error("Ошибка регистрации", error);
          alert("Произошла ошибка при регистрации");
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
            <label>Имя пользователя:</label>
            <Input
              {...register("fullName")}
              placeholder="Name"
              errorList={errors?.fullName?.message}
            />
          </div>
          <div className={styles.formItem}>
            <label>Email:</label>
            <Input
              {...register("email")}
              placeholder="Email"
              errorList={errors?.email?.message}
            />
          </div>
          <div className={styles.formItem}>
            <label>Пароль:</label>
            <Input
              {...register("password")}
              placeholder="Password"
              errorList={errors?.password?.message}
              isPassword={true}
            />
          </div>
          <div className={styles.formItem}>
            <label>Повторите пароль:</label>
            <Input
              {...register("confirmPassword")}
              placeholder="Confirm password"
              errorList={errors?.confirmPassword?.message}
              isPassword={true}
            />
          </div>
          <Button
            width={310}
            height={60}
            margin={30}
            children="Зарегистрироваться"
          />
        </form>
        <p>Уже есть аккаунт?</p>
        <Link to={"/auth/login"}>
          <span>Авторизоваться</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
