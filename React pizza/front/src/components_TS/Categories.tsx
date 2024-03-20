import React from "react";

const Categories = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);

  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((text: string, index: number) => (
          <li
            key={index}
            onClick={() => {
              setCurrentCategory(index);
            }}
            className={currentCategory === index ? "active" : ""}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
