import styles from "./hashtag.module.scss";

const Hashtag = () => {
  const arrHash = [1, 2, 3];

  return (
    <div className={styles.root}>
      <span>Тэги</span>
      <div className={styles.hashtagItems}>
        {arrHash.map((item, index) => (
          <div className={styles.item} key={index}>
            <span># </span>
            <p>хэштэг {item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hashtag;
