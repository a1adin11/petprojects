import * as yup from "yup";

export const addPostSchema = yup.object().shape({
  text: yup
    .string()
    .max(2000, "сообщение слишком длинное, максимальное число символов 2000")
    .required(),
});
