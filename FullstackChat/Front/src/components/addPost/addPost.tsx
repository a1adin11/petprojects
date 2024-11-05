import React, { useRef } from "react";
import styles from "./addPost.module.scss";
import AddTag from "../addTag/addTag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { onAddToTags } from "../../redux/slices/tagsSlice";
import { IRequestPost } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPostSchema } from "../validations/addPost.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddPostMutation } from "../../redux/api";

const AddPost = () => {
  const [addNewPost, { error }] = useAddPostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestPost>({
    resolver: yupResolver(addPostSchema),
  });

  const onSubmit: SubmitHandler<IRequestPost> = async (data) => {

    let attachmentsId = []; 
    const attachments = fileInputRef.current?.files;
    let filesArray: File[] = [];
    const formDataFiles = new FormData();

    if (attachments) {
      console.log(attachments);

      filesArray = Array.from(attachments);

      filesArray.forEach((file, index) => {
        formDataFiles.append(`file_${index + 1}`, file);
      });
    }
    const postData = { text: data.text, tags: tags };

    console.log(
      "Tags:",
      tags,
      "filesArray:",
      formDataFiles,
      "text:",
      data.text
    );

    await addAttachments(FormData)
      .unwrap()
      .then((response) => {
        console.log(response.body.id);
        attachmentsId = response.body.id
        // navigate("/");
      })
      .catch((rejected) => {
        if (rejected && "data" in rejected) {
          alert(rejected.data.message);
        } else {
          console.error("Ошибка регистрации", error);
          alert("Произошла ошибка при регистрации");
        }
      });
    await addNewPost(postData)
      .unwrap()
      .then((response) => {
        console.log(response);

        // navigate("/");
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

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tags = useSelector((state: RootState) => state.tagsState.TagItems);

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
          <input type="text" placeholder="Что нового?" {...register("text")} />
          <div className={styles.added}>
            <svg
              onClick={() => fileInputRef.current?.click()} // Используем fileInputRef.current
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 555.073 555.073"
            >
              <g>
                <path d="M60.629,498.186c37.387,37.388,98.22,37.388,135.607,0L300.852,393.57l74.56-74.56l19.554-19.553 c26.604-26.604,26.604-69.891,0-96.494l-14.462-14.462c-26.604-26.604-69.89-26.604-96.494,0L146.615,325.896 c-11.952,11.953-11.952,31.328,0,43.274c11.946,11.946,31.328,11.946,43.274,0l137.395-137.394c2.741-2.741,7.203-2.741,9.944,0 l14.462,14.462c2.742,2.741,2.742,7.203,0,9.945l-19.554,19.553l-74.56,74.56L152.962,454.911 c-13.525,13.525-35.533,13.525-49.058,0l-32.595-32.595c-13.525-13.525-13.525-35.533,0-49.058l21.322-21.322l179.493-179.493 l63.465-63.465c25.281-25.281,66.42-25.281,91.702,0l47.65,47.65c25.281,25.282,25.281,66.421,0,91.702L249.297,473.976 c-11.953,11.952-11.953,31.328,0,43.274c11.946,11.946,31.328,11.946,43.274,0l225.645-225.645 c49.144-49.144,49.144-129.107,0-178.251l-47.65-47.65c-49.144-49.144-129.107-49.144-178.251,0l-63.465,63.465L49.362,308.662 L28.04,329.984c-37.387,37.387-37.387,98.22,0,135.606L60.629,498.186z" />
              </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485">
              <g>
                <path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5 s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026 C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5 S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z" />
                <path d="M318.514,231.486c19.299,0,35-15.701,35-35s-15.701-35-35-35s-35,15.701-35,35S299.215,231.486,318.514,231.486z" />
                <path d="M166.486,231.486c19.299,0,35-15.701,35-35s-15.701-35-35-35s-35,15.701-35,35S147.188,231.486,166.486,231.486z" />
                <path
                  d="M242.5,355c-46.911,0-89.35-29.619-105.604-73.703l-28.148,10.378C129.329,347.496,183.08,38
                5,242.5,385 s113.171-37.504,133.752-93.325l-28.148-10.378C331.85,325.381,289.411,355,242.5,355z"
                />
              </g>
            </svg>
          </div>
        </div>
        {isVisible && (
          <div className={styles.bottom}>
            <input
              autoComplete="off"
              style={{ display: "none" }}
              type="file"
              ref={fileInputRef}
              multiple
              accept=".jpg,.jpeg,.png,.gif,.mp3,.mp4"
            />
            <div className={styles.options}>
              <input
                type="text"
                placeholder="Тэги"
                {...register("tags")}
                ref={inputRef}
              />
              <button onClick={() => addTagInPost()}>+</button>
            </div>
            <div className={styles.tags}>
              {tags.map((item, index) => (
                <AddTag text={item} key={index} />
              ))}
            </div>
            <button className={styles.submit}>Отправить</button>
          </div>
        )}
      </form>
    </div>
  );
};
