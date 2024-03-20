import React from "react";

import "./scss/app.scss";

import Header from "./components_TS/Header";
import Sort from "./components_TS/Sort";
import Categories from "./components_TS/Categories";
import PizzaBlock from "./components_TS/PizzaBlock";
import axios from "axios";
import { Pizza } from "./models/pizza";

function App() {
  const [IsLoadingReady, setIsLoadingReady] = React.useState(false);
  const [items, setItems] = React.useState<Pizza[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoadingReady(false);
      const itemsResponse = await axios.get("http://localhost:3000/items");
      setItems(itemsResponse.data);

      setIsLoadingReady(true);
    }

    fetchData();
  }, []);

  console.log(items);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((item) => (
              <PizzaBlock
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
