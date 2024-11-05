import { useDispatch } from "react-redux";
import { onRemoveToTags } from "../../redux/slices/tagsSlice";
import styles from "./addTag.module.scss";

interface PropsAddTag {
  text: string;
}

const AddTag = ({ text }: PropsAddTag) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      #{text}
      <svg
        onClick={(event) => {
          dispatch(onRemoveToTags(text));
          event.stopPropagation();
        }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.41421 1.41421L14.5858 14.5858"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5858 1.41421L1.41421 14.5858"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default AddTag;
