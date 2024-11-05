import styles from "./user.page.module.scss";
import Post from "../../components/post/Post";

const UserPage = () => {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <img src="src/assets/utilsIcon/userDefaultImg.svg" alt="" />
        <div className={styles.info}>
          <h3>Ann Hatuay</h3>
          <div className={styles.grid}>
            <div className={styles.string}>
              <span>Возраст:</span>
              <p>25 лет</p>
            </div>
            <div className={styles.string}>
              <span>Стана:</span>
              <p>США</p>
            </div>
            <div className={styles.string}>
              <span>Город:</span>
              <p>Los Angeles</p>
            </div>
            <div className={styles.string}>
              <span>Email:</span>
              <p>annHat@yoohoo.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.myPosts}>
        {arr.map((_, index) => (
          <Post key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
