import AddPost from "../../components/addPost/addPost";
import Comments from "../../components/comments/comments";
import Hashtag from "../../components/hashtag/hashtag";
import Post from "../../components/post/Post";
import Sort from "../../components/sort/sort";
import styles from "./home.page.module.scss";

const HomePage = () => {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.root}>
      <div className={styles.posts}>
        <Sort />
        <AddPost />
        {arr.map((_, index) => (
          <Post key={index} />
        ))}
      </div>

      <div className={styles.rightPart}>
        <Hashtag />
        <Comments />
      </div>
    </div>
  );
};

export default HomePage;
