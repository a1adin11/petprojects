import styles from "./comments.module.scss";

const Comments = () => {
  const commentArr = [1, 2, 3];

  return (
    <div className={styles.root}>
      <span>Коментирии</span>
      <div className={styles.commentItems}>
        {commentArr.map((item, index) => (
          <div className={styles.item} key={index}>
            <img src="src\assets\utilsIcon\userDefaultImg.svg" alt="" />
            <div className={styles.text}>
              <span>user{index}</span>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, fuga veritatis? Iste aut sed delectus provident minima cupiditate excepturi. Voluptates esse reprehenderit assumenda architecto ipsam. Ipsam dolorum accusantium beatae id? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur provident tenetur dicta itaque voluptatem blanditiis optio quas fuga dolor quibusdam omnis voluptate vero magnam, animi nulla nihil fugit consequuntur ipsum?</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
