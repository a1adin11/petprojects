import React, { useRef } from "react";
import styles from "./addPost.module.scss";
import AddTag from "../addTag/addTag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { onAddToTags, clearTags} from "../../redux/slices/tagsSlice";
import { IRequestPost } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPostSchema } from "../validations/addPost.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddAttachmentsMutation, useAddPostMutation } from "../../redux/api";

const AddPost = () => {
  const [addNewPost] = useAddPostMutation();
  const [addAttachments, { error }] = useAddAttachmentsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestPost>({
    resolver: yupResolver(addPostSchema),
  });

  const onSubmit: SubmitHandler<IRequestPost> = async (data) => {
    let attachmentsId: string[] = [];
    const attachments = fileInputRef.current?.files;
    const formDataFiles = new FormData();

    // Если есть вложения, отправляем их
    console.log(Boolean(attachments), attachments?.length);

    if (attachments && attachments.length > 0) {
      Array.from(attachments).forEach((file) => {
        formDataFiles.append("files", file);
      });
      try {
        const attachmentsResponse = await addAttachments(formDataFiles)
          .unwrap()
          .catch((e) => {
            console.log(e);
            return e;
          });
        console.log(attachmentsResponse);
        attachmentsId = attachmentsResponse.attachmentId;
        const postData = {
          text: data.text,
          tags: tags,
          attachments: attachmentsId,
        };

        // Отправляем пост, только если отправка вложений была успешной

        const postResponse = await addNewPost(postData).unwrap();
        console.log(postResponse);
      } catch (rejected) {
        console.error("Ошибка отправки вложений", rejected);
        alert("Ошибка отправки вложений");
        return; // Прерываем выполнение
      }
      inputRef.current && (inputRef.current.value = "");
    } else if (data.text) {
      try {
        const postData = {
          text: data.text,
          tags: tags,
        };
        const response = await addNewPost(postData).unwrap();
        console.log(response);
      } catch (e) {
        alert(e);
      }
    }
    inputRef.current && (inputRef.current.value = "");
    dispatch(clearTags())
  };

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tags = useSelector((state: RootState) => state.tagsState.tagItems);

  const dispatch = useDispatch();

  const addTagInPost = () => {
    const inputValue = inputRef.current?.value.trim(); // Используем inputRef.current
    if (inputValue) {
      dispatch(onAddToTags(inputValue));
      if (inputRef.current) {
        // Используем inputRef.current
        inputRef.current.value = "";
      }
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={styles.root} ref={divRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.text}>
          <img src="src/assets/utilsIcon/userDefaultImg.svg" alt="" />
          <input
            autoComplete={"off"}
            type="text"
            placeholder="Что нового?"
            {...register("text")}
          />
          <div className={styles.added}>
            <svg
              onClick={() => fileInputRef.current?.click()} // Используем fileInputRef.current
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 555.073 555.073"
              width="20"
              height="20"
            >
              <g>
                <path d="M60.629,498.186c37.387,37.388,98.22,37.388,135.607,0L300.852,393.57l74.56-74.56l19.554-19.553 c26.604-26.604,26.604-69.891,0-96.494l-14.462-14.462c-26.604-26.604-69.89-26.604-96.494,0L146.615,325.896 c-11.952,11.953-11.952,31.328,0,43.274c11.946,11.946,31.328,11.946,43.274,0l137.395-137.394c2.741-2.741,7.203-2.741,9.944,0 l14.462,14.462c2.742,2.741,2.742,7.203,0,9.945l-19.554,19.553l-74.56,74.56L152.962,454.911 c-13.525,13.525-35.533,13.525-49.058,0l-32.595-32.595c-13.525-13.525-13.525-35.533,0-49.058l21.322-21.322l179.493-179.493 l63.465-63.465c25.281-25.281,66.42-25.281,91.702,0l47.65,47.65c25.281,25.282,25.281,66.421,0,91.702L249.297,473.976 c-11.953,11.952-11.953,31.328,0,43.274c11.946,11.946,31.328,11.946,43.274,0l225.645-225.645 c49.144-49.144,49.144-129.107,0-178.251l-47.65-47.65c-49.144-49.144-129.107-49.144-178.251,0l-63.465,63.465L49.362,308.662 L28.04,329.984c-37.387,37.387-37.387,98.22,0,135.606L60.629,498.186z" />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z"></path>
            </svg>
          </div>
        </div>
        {isVisible && (
          <div className={styles.bottom}>
            <input
              style={{ display: "none" }}
              type="file"
              ref={fileInputRef}
              multiple={true}
              accept=".jpg,.jpeg,.png,.gif,.mp3,.mp4"
            />
            <div className={styles.options}>
              <input
                autoComplete={"off"}
                type="text"
                placeholder="Тэги"
                {...register("tags")}
                ref={inputRef}
              />
              <button type="button" onClick={() => addTagInPost()}>
                +
              </button>
            </div>
            <div className={styles.tags}>
              {tags.map((item, index) => (
                <AddTag text={item} key={index} />
              ))}
            </div>
            <button type="submit" className={styles.submit}>
              Отправить
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPost;
