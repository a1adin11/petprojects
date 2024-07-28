import React from "react";
import { Routes, Route } from "react-router";
import "./scss/app.scss";
import Header from "./components_TS/Header";
import PizzaPage from "./pages/Pizza.page";
import CartPage from "./pages/Cart.page";
import NotFound from "./pages/Not.Found";

export const AppContext = React.createContext("");

const onAddToCart = () => {};

function App() {
  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<PizzaPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;
