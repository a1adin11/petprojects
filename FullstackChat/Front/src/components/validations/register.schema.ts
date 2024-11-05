import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Минимальное количество символов 3")
    .max(30, "Максимальное количество символов 30"),
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Это обязательное поле"),
  password: yup
    .string()
    .min(6, "Минимальная длина 6 символов")
    .max(15, "Максимальная длинна 15 символов")
    .required("Это обязательное поле"),
  // .matches(
  //   /^(?=.[a-zA-Я\d])(?=.[A-ZА-Я]).{6,9}$/,
  //   "Пароль должен содердать зотя бы одну заглавную букву и цифру"
  // ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Это обязательное поле"),
});
