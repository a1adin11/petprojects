import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Введите корректный e-mail").required("Введите почту"),
  password: yup.string().required("Введите пароль"),
});